const mongoose = require("mongoose");
const crypto = require('crypto');
const uniqueValidator = require("mongoose-unique-validator");
const PatientSchema = mongoose.Schema(
  {
    date: { type: String },
    fullname: { type: String },
    email: { type: String },
    dob: { type: String },
    address: { type: String },
    phone: { type: String, required: true, unique: true },
    occupation: { type: String },
    prescription: [],
    optical: [],
    spects: [],
  },
  {
    timestamps: true,
  }
);

PatientSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Patient", PatientSchema);