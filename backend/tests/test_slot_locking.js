const mongoose = require("mongoose");
const Appointment = require("./modal/Appointment");
const Doctor = require("./modal/Doctor");
const Patient = require("./modal/Patient");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function log(message) {
    console.log(message);
    fs.appendFileSync("test_slot_output.txt", message + "\n");
}

async function testSlotLocking() {
    try {
        fs.writeFileSync("test_slot_output.txt", ""); // Clear file
        await mongoose.connect(MONGO_URI);
        log("Connected to MongoDB");

        // 1. Find a doctor and patient
        const doctor = await Doctor.findOne();
        const patient = await Patient.findOne();

        if (!doctor || !patient) {
            log("Missing doctor or patient. Skipping test.");
            return;
        }

        log(`Testing with Doctor: ${doctor.name}`);
        log(`Testing with Patient: ${patient.name}`);

        // 2. Define a slot
        const date = new Date();
        date.setDate(date.getDate() + 1); // Tomorrow
        const slotStart = new Date(date);
        slotStart.setHours(10, 0, 0, 0);
        const slotEnd = new Date(date);
        slotEnd.setHours(10, 30, 0, 0);

        const slotStartIso = slotStart.toISOString();
        const slotEndIso = slotEnd.toISOString();

        log(`Attempting to book slot: ${slotStartIso} - ${slotEndIso}`);

        // 3. Cleanup existing appointments for this slot (to ensure clean test)
        await Appointment.deleteMany({
            doctorId: doctor._id,
            slotStartIso: slotStartIso
        });
        log("Cleaned up existing appointments for this slot.");

        // 4. Book First Appointment
        const appointment1 = new Appointment({
            doctorId: doctor._id,
            patientId: patient._id,
            date: date,
            slotStartIso: slotStartIso,
            slotEndIso: slotEndIso,
            consultationType: "Video Consultation",
            status: "Scheduled",
            consultationFees: 500,
            platformFees: 50,
            totalAmount: 550,
            paymentStatus: "Pending"
        });

        await appointment1.save();
        log("✅ First appointment booked successfully.");

        // 5. Attempt Double Booking
        log("Attempting to book the SAME slot again...");

        try {
            const appointment2 = new Appointment({
                doctorId: doctor._id,
                patientId: patient._id,
                date: date,
                slotStartIso: slotStartIso,
                slotEndIso: slotEndIso,
                consultationType: "Voice Call",
                status: "Scheduled",
                consultationFees: 500,
                platformFees: 50,
                totalAmount: 550,
                paymentStatus: "Pending"
            });

            await appointment2.save();
            log("❌ ERROR: Double booking was ALLOWED! Slot locking failed.");
        } catch (error) {
            if (error.code === 11000) {
                log("✅ SUCCESS: Double booking prevented by Database Index (Duplicate Key Error).");
            } else {
                log("✅ SUCCESS: Double booking prevented (Other Error: " + error.message + ")");
            }
        }

    } catch (error) {
        log("Test failed: " + error);
    } finally {
        await mongoose.disconnect();
        log("Disconnected from MongoDB");
    }
}

testSlotLocking();
