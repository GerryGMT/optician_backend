const Patient = require("../models/patient.model.js");
const crypto = require("crypto");
const AppError = require("../util/AppError.js");
const catchAsync = require("../util/catchAsync.js");
const bcrypt = require("bcrypt");
const setTZ = require('set-tz');
setTZ('Africa/Nairobi');

//Add patient
exports.addPatient = (req, res, next) => {
    const patient = new Patient({
      date: req.body.date,
      fullname: req.body.fullname,
      email: req.body.email,
      dob: req.body.dob,
      address: req.body.address,
      phone: req.body.phone,
      occupation: req.body.occupation,
      prescription: [],
      optical: [],
      spects: [],
    });
    patient
      .save()
      .then(() => {
        res.status(200).json({
          message: "Patient added!",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
  };

// Retrieve and return all patients from the database.
exports.findAllPatients = (req, res) => {
    Patient.find()
    .then((patients) => {
      res.send(patients);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving patients.",
      });
    });
};

// Find a single patient with a patientId
exports.findOnePatient = (req, res) => {
    Patient.findById(req.params.patientId)
    .then((patient) => {
      if (!patient) {
        return res.status(404).send({
          message: "Patient not found with id " + req.params.patientId,
        });
      }
      res.send(patient);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Patient not found with id " + req.params.patientId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving patient with id " + req.params.patientId,
      });
    });
};

// Update patient data
exports.updatePatient = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Patient to update can not be empty!"
        });
        }
        const id = req.params.patientId;
        Patient.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
            res.status(404).send({
                message: `Cannot update patient with id=${id}. Maybe Tutorial was not found!`
            });
            } else res.send({ message: "Patient was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
            error: err,
            message: "Error updating patient with id=" + id
            });
        });
};

// Add patient prescription
exports.addPatientPx = (req, res) => {

    const id = req.params.patientId;

    Patient.findById(id, function (err, patient) {
        if (err) {
          return console.log(err);
        }
        patient.prescription.push({
          date: Date.now(),
          px: req.body.px,
        });
        patient.save(function (err) {
          if (err) {
            return console.log(err);
          } else {
            return res.status(201).json({
              status: "success",
              message: "Prescription Added!",
            });
          }
        });
      });
};

// Add patient optical
exports.addPatientOptical = (req, res) => {

    const id = req.params.patientId;

    Patient.findById(id, function (err, patient) {
        if (err) {
          return console.log(err);
        }
        patient.optical.push({
          date: Date.now(),
          sph: req.body.sph,
          cyl: req.body.cyl,
          axis: req.body.axis,
          va: req.body.va,
          add: req.body.add,
        });
        patient.save(function (err) {
          if (err) {
            return console.log(err);
          } else {
            return res.status(201).json({
              status: "success",
              message: "Optical Added!",
            });
          }
        });
      });
};

// Add patient spects
exports.addPatientSpects = (req, res) => {
   
    const id = req.params.patientId;

    Patient.findById(id, function (err, patient) {
        if (err) {
          return console.log(err);
        }
        patient.spects.push({
          date: Date.now(),
          frame: req.body.frame,
          lenses: req.body.lenses,
          total: req.body.total,
          dep: req.body.dep,
          bal: req.body.bal,
        });
        patient.save(function (err) {
          if (err) {
            return console.log(err);
          } else {
            return res.status(201).json({
              status: "success",
              message: "Spects Added!",
            });
          }
        });
      });
};