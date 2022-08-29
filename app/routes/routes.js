module.exports = (app) => {
    const auth = require("../middleware/auth.js");
    const users = require("../controllers/user.controller.js");
    const patients = require("../controllers/patient.controller.js");
  
    // User sign up
    app.post("/register", users.signup);

    // user login
    app.post("/login", users.login);
  
    // Retrieve all users
    app.get("/users", auth, users.findAll);
  
    // Retrieve a single user with usersId
    app.get("/users/:userId", auth, users.findOne);

    // User forgot password
    app.post("/forgotPassword", users.forgotPassword);

    //User reset password
    app.patch("/resetPassword", users.resetPassword);

    // Add patient
    app.post("/patient", auth, patients.addPatient);

    // Retrieve all patients
    app.get("/patients", auth, patients.findAllPatients);

    // Retrieve a single patient with patientsId
    app.get("/patient/:patientId", auth, patients.findOnePatient);

    // Update users
    app.put("/patient/:patientId", auth, patients.updatePatient);

    // Add patient prescription
    app.post("/patient/px/:patientId", auth, patients.addPatientPx);

    // Add patient optical
    app.post("/patient/opt/:patientId", auth, patients.addPatientOptical);

    // Add patient spects
    app.post("/patient/spects/:patientId", auth, patients.addPatientSpects);
  };