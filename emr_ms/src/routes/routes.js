import express from 'express';
import db from '../database/connection';
import * as jwt from 'jsonwebtoken'
const argon2 = require('argon2');


const router = express.Router();

//Read, Edit, Add and Delete routes for primary Patient table

router.get("/api/patient", (req, res) => {
    db.query('SELECT * FROM patient WHERE ActiveFlag = 1 AND HealthCardNumberID = ?', [req.query.HealthCardNumberID], function (error, results, fields){
        if (error) throw error;
        console.log("finished retrieval");
        return res.status(200).send(results);
    })

})

router.post("/api/patient/edit", async (req, res, next) => {
    try {
        db.query('UPDATE patient SET ? WHERE HealthCardNumberID = ?', 
        [req.body, req.body.HealthCardNumberID], function (error, results, fields){
            if (error) throw error;
            console.log("finished patient update");
            return res.status(200).send(results);
        })
    } catch (error) {
    console.error(error);
    next(error);
    }
})

router.post("/api/patient/add", async (req, res, next) => {
    try {
        db.query('INSERT INTO patient SET ?', [req.body], function (error, results, fields){
            if (error) throw error;
            console.log("finished patient add");
            return res.status(200).send(results);
        })
    } catch (error) {
    console.error(error);
    next(error);
    }
})

router.post("/api/patient/delete", async (req, res, next) => {
    

// UPDATE patient SET ? WHERE HealthCardNumberID = ?
    try {
        db.query(
            "UPDATE patient, patienttocareprovider SET patient.ActiveFlag = 0, patienttocareprovider.ActiveFlag = 0 WHERE        patient.HealthCardNumberID = ? AND patienttocareprovider.PatientID = ?;",[req.body.HealthCardNumberID, req.body.HealthCardNumberID],
            function (error, results, fields) {
              if (error) throw error;
              console.log("finished patient delete update");
              return res.status(200).send(results);
        })
    } catch (error) {
    console.error(error);
    next(error);
    }
})

// Add Patient/Care Provider XREF data route to patienttocareprovider table during patient add process.

router.post("/api/p2c/patient/add", async (req, res, next) => {
    console.log(req.body)
    try {
        db.query('INSERT INTO patienttocareprovider (CareProviderID, PatientID, ActiveFlag) VALUES ?', [req.body], function (error, results, fields){
            if (error) throw error;
            console.log("finished patienttocareprovider add");
            return res.status(200).send(results);
        })
    } catch (error) {
    console.error(error);
    next(error);
    }
})

// Read, Edit, Add and Delete routes for primary Patient table

router.get("/api/careprovider", (req, res) => {
    db.query('SELECT * FROM careprovider WHERE ActiveFlag = 1 AND MedicalLicenseID = ?', [req.query.MedicalLicenseID], function (error, results, fields){
        if (error) throw error;
        console.log("finished retrieval");
        return res.status(200).send(results);
    })

})

router.post("/api/careprovider/edit", async (req, res, next) => {
    try {
        db.query('UPDATE careprovider SET ? WHERE MedicalLicenseID = ?', 
        [req.body, req.body.MedicalLicenseID], function (error, results, fields){
            if (error) throw error;
            console.log("finished careprovider update");
            return res.status(200).send(results);
        })
    } catch (error) {
    console.error(error);
    next(error);
    }
})

router.post("/api/careprovider/add", async (req, res, next) => {
    try {
        db.query('INSERT INTO careprovider SET ?', [req.body], function (error, results, fields){
            if (error) throw error;
            console.log("finished careprovider add");
            return res.status(200).send(results);
        })
    } catch (error) {
    console.error(error);
    next(error);
    }
})

router.post("/api/careprovider/delete", async (req, res, next) => {
    try {
        db.query(
            "UPDATE careprovider, patienttocareprovider SET careprovider.ActiveFlag = 0, patienttocareprovider.ActiveFlag = 0 WHERE careprovider.MedicalLicenseID = ? AND patienttocareprovider.CareProviderID = ?;",[req.body.MedicalLicenseID, req.body.MedicalLicenseID],
            function (error, results, fields) {
              if (error) throw error;
              console.log("finished care provider delete update");
              return res.status(200).send(results);
        })
    } catch (error) {
    console.error(error);
    next(error);
    }
})


// Patient and Care Provider XREF table search and update routes

router.get("/api/p2c/patient", (req, res) => {
    let query = () => {
        if(req.query.CareProviderID) {
            return `SELECT patient.HealthCardNumberID, patient.firstName, patient.lastName, patient.Phone, patienttocareprovider.CareProviderID FROM patient JOIN patienttocareprovider ON patient.HealthCardNumberID = patienttocareprovider.PatientID WHERE patient.HealthCardNumberID = ${req.query.HealthCardNumberID} AND patienttocareprovider.CareProviderID = ${req.query.CareProviderID} AND patienttocareprovider.ActiveFlag = 1`
        } else { 
            return `SELECT patient.HealthCardNumberID, patient.firstName, patient.lastName, patient.Phone, patienttocareprovider.CareProviderID FROM patient JOIN patienttocareprovider ON patient.HealthCardNumberID = patienttocareprovider.PatientID WHERE patient.HealthCardNumberID = ${req.query.HealthCardNumberID} AND patient.ActiveFlag = 1`
        }
    }
    db.query(query(), function (error, results, fields){
        if (error) throw error;
        console.log("finished search");
        return res.status(200).send(results);
    })

})

router.get("/api/p2c/name", (req, res) => {
    let query = () => {
        if(req.query.CareProviderID) {
            return `SELECT patient.HealthCardNumberID, patient.firstName, patient.lastName, patient.Phone, patienttocareprovider.CareProviderID FROM patient JOIN patienttocareprovider ON patient.HealthCardNumberID = patienttocareprovider.PatientID WHERE patient.lastName = '${req.query.lastName}' AND patienttocareprovider.CareProviderID = ${req.query.CareProviderID} AND patienttocareprovider.ActiveFlag = 1`
        } else { 
            return `SELECT patient.HealthCardNumberID, patient.firstName, patient.lastName, patient.Phone, patienttocareprovider.CareProviderID FROM patient JOIN patienttocareprovider ON patient.HealthCardNumberID = patienttocareprovider.PatientID WHERE patient.lastName = '${req.query.lastName}' AND patient.ActiveFlag = 1`
        }
    }
    db.query(query(), function (error, results, fields){
        if (error) throw error;
        console.log("finished search");
        return res.status(200).send(results);
    })

})

router.get("/api/p2c/all", (req, res) => {
    let query = () => {
        if(req.query.CareProviderID) {
            return `SELECT patient.HealthCardNumberID, patient.firstName, patient.lastName, patient.Phone, patienttocareprovider.CareProviderID FROM patient JOIN patienttocareprovider ON patient.HealthCardNumberID = patienttocareprovider.PatientID WHERE patienttocareprovider.CareProviderID = ${req.query.CareProviderID} AND patienttocareprovider.ActiveFlag = 1`
        } else { 
            return `SELECT patient.HealthCardNumberID, patient.firstName, patient.lastName, patient.Phone, patienttocareprovider.CareProviderID FROM patient JOIN patienttocareprovider ON patient.HealthCardNumberID = patienttocareprovider.PatientID WHERE patient.ActiveFlag = 1`
        }
    }
    console.log(req.query)
    db.query(query(), function (error, results, fields){
        if (error) throw error;
        console.log("finished search");
        return res.status(200).send(results);
    })

})

// Care Provider Search routes

router.get("/api/cp/medicalID", (req, res) => {
    db.query('SELECT MedicalLicenseID, firstName, lastName, Phone, Email FROM careprovider WHERE ActiveFlag = 1 AND MedicalLicenseID = ?', [req.query.MedicalLicenseID], function (error, results, fields){
        if (error) throw error;
        console.log("finished search");
        return res.status(200).send(results);
    })

})

router.get("/api/cp/name", (req, res) => {
    db.query('SELECT MedicalLicenseID, firstName, lastName, Phone, Email FROM careprovider WHERE ActiveFlag = 1 AND lastName = ?', [req.query.lastName], function (error, results, fields){
        if (error) throw error;
        console.log("finished search");
        return res.status(200).send(results);
    })

})

router.get("/api/cp/all", (req, res) => {
    db.query('SELECT MedicalLicenseID, firstName, lastName, Phone, Email FROM careprovider WHERE ActiveFlag = 1', function (error, results, fields){
        if (error) throw error;
        console.log("finished search");
        return res.status(200).send(results);
    })

})

// Revision Details Read and Adds

router.get("/api/revision", (req, res) => {
    console.log(req.query)
    const query = `SELECT * FROM revisiondetails  WHERE PatientID = ${req.query.HealthCardNumberID} ORDER BY Timestamp DESC LIMIT ${req.query.limit} OFFSET ${req.query.offset}`
    
    db.query(query, function (error, results, fields){
        if (error) throw error;
        console.log("finished search");
        return res.status(200).send(results);
    })

})

router.post("/api/revision/add", async (req, res, next) => {
    try {
        db.query('INSERT INTO revisiondetails SET ?', [req.body], function (error, results, fields){
            if (error) throw error;
            console.log("finished revisiondetails add");
            return res.status(200).send(results);
        })
    } catch (error) {
    console.error(error);
    next(error);
    }
})

// Authorization routes

router.post("/api/auth", async (req, res, next) => {
    try{
        const {username, password} = req.body

        if (!username || !password){
            return res.status(401).send({message: "incorrect credentials provided"})
        }

        db.query('SELECT * FROM user WHERE Username = ?', [username], async function(error, results, fields) {
            if (error) throw error

            if(!results[0] || results[0].Password != password){
            //if(!results || !(await argon2.verify(results[0].password, password))){
                return res.status(401).json({message: "incorrect credentials provided"})
            } else {
                const token = jwt.sign({username}, process.env.JWT_SECRET, {expiresIn: '5m'})
                console.log("Logged in as: " + username);
                if(results[0].SuperAdminID){
                    console.log(username + " is also a SuperAdmin");
                }
                return res.status(200).send({token, results});          
            }
        });
    } catch(err){
        console.log(err);
        next(err);
    }
    // db.query('SELECT * FROM test', function (error, results, fields){
    //     if (error) throw error;
    //     console.log("finished retrieval");
    //     return res.status(200).send(results);
    // })
})

//use to add users through Postman with encrypted password. *Needed to use logIn later*.
// router.post('/api/users', async (req, res) => {
//     req.body.Password = await argon2.hash(req.body.Password)
//     const query = `INSERT INTO user VALUES (${req.body.CareProviderID}, '${req.body.SuperAdminID}', '${req.body.Username}', "${req.body.Password}", 1);`
//     await db.query(query,function(error, results, fields){
//         if (error) throw error
//         return res.status(201).send(results)
//     })
    
// })


export default router
