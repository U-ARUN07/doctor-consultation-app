const mongoose = require('mongoose');

const healthcareCategoriesList = [
    "Primary Care",
    "Manage Your Condition",
    "Mental & Behavioral Health",
    "Sexual Health",
    "Children's Health",
    "Senior Health",
    "Women's Health",
    "Men's Health",
    "Wellness",
    "Heart Health",
    "Skin Care",
    "Bone & Joint Health",
    "Brain & Nerves",
    "Eye Care",
    "Dental Care",
    "Urinary Health",
    "Cancer Care",
    "Hormonal Health",
    "Digestive Health",
    "Lung Health",
    "Kidney Health",
    "Immune System",
];

const dailyTimeRangeSchema = new mongoose.Schema({
    start: { type: String, required: true }, // "09:00"
    end: { type: String, required: true }    // "17:00"
}, { _id: false });

const availabilityRangeSchema = new mongoose.Schema({
    startDate: { type: Date },
    endDate: { type: Date },
    excludedWeekdays: { type: [Number], default: [] }, // 0=Sunday, 1=Monday...
    blockedDates: { type: [String], default: [] } // ["2024-12-25", "2025-01-01"]
}, { _id: false });

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String, unique: true, sparse: true },
    profileImage: { type: String, default: '' },

    specialization: {
        type: String,
        enum: [
            'Cardiologist', 'Dermatologist', 'Orthopedic', 'Pediatrician',
            'Neurologist', 'Gynecologist', 'General Physician', 'ENT Specialist',
            'Psychiatrist', 'Ophthalmologist', 'Dentist', 'Urologist', 'Oncologist',
            'Endocrinologist', 'Gastroenterologist', 'Pulmonologist', 'Nephrologist', 'Rheumatologist'
        ]
    },
    category: { type: [String], enum: healthcareCategoriesList, required: false },

    qualification: { type: String, required: false },
    experience: { type: Number },
    about: { type: String },
    fees: { type: Number },

    hospitalInfo: {
        name: String,
        address: String,
        city: String,
    },

    availabilityRange: availabilityRangeSchema,
    dailyTimeRanges: { type: [dailyTimeRangeSchema], default: [] },
    slotDurationMinutes: { type: Number, default: 30 },

    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

}, { timestamps: true });

// Indexes for search and filtering
doctorSchema.index({ specialization: 1 });
doctorSchema.index({ category: 1 });
doctorSchema.index({ 'hospitalInfo.city': 1 });
doctorSchema.index({ fees: 1 });
doctorSchema.index({ name: 'text', specialization: 'text' }); // Text index for search

module.exports = mongoose.model('Doctor', doctorSchema);