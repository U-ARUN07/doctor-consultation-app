const mongoose = require("mongoose");
const Appointment = require("./modal/Appointment");
const Doctor = require("./modal/Doctor");
const Patient = require("./modal/Patient");

const dotenv = require("dotenv");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const fs = require("fs");

async function log(message) {
    console.log(message);
    fs.appendFileSync("test_output.txt", message + "\n");
}

async function testDoctorNotification() {
    try {
        fs.writeFileSync("test_output.txt", ""); // Clear file
        await mongoose.connect(MONGO_URI);
        log("Connected to MongoDB");

        // 1. Find a doctor
        const doctor = await Doctor.findOne();
        if (!doctor) {
            log("No doctor found. Skipping test.");
            return;
        }
        log(`Testing with Doctor: ${doctor.name} (${doctor._id})`);

        // 2. Find appointments for this doctor
        const appointments = await Appointment.find({ doctorId: doctor._id })
            .populate("patientId", "name")
            .limit(5);

        if (appointments.length === 0) {
            log("No appointments found for this doctor.");
        } else {
            log(`Found ${appointments.length} appointments.`);
            appointments.forEach((apt, index) => {
                log(`Appointment ${index + 1}:`);
                log(`  Status: ${apt.status}`);
                log(`  Patient Name: ${apt.patientId ? apt.patientId.name : "N/A"}`);
                if (apt.patientId && apt.patientId.name) {
                    log("  ✅ Patient name is present");
                } else {
                    log("  ❌ Patient name is MISSING");
                }
            });
        }

    } catch (error) {
        log("Test failed: " + error);
    } finally {
        await mongoose.disconnect();
        log("Disconnected from MongoDB");
    }
}

testDoctorNotification();
