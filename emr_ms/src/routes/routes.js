import express from 'express';
import db from '../database/connection';
import * as jwt from 'jsonwebtoken'
// const argon2 = require('argon2');


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
    try {
        db.query(
            "UPDATE patient, patienttocareprovider SET patient.ActiveFlag = 0, patienttocareprovider.ActiveFlag = 0 WHERE patient.HealthCardNumberID = ? AND patienttocareprovider.PatientID = ?;",[req.body.HealthCardNumberID, req.body.HealthCardNumberID],
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

            if(!results[0] || results[0].Password !== password){
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

// Address table routes 

router.get("/api/address", (req, res) => {
    let query = () => {
        if(req.query.CareProviderID) {
            return `SELECT * FROM address WHERE ActiveFlag = 1 AND CareProviderID = ${req.query.CareProviderID}`
        } else { 
            return `SELECT * FROM address WHERE ActiveFlag = 1 AND PatientID = ${req.query.HealthCardNumberID}`
        }
    }
    db.query(query(), function (error, results, fields){
        if (error) throw error;
        console.log("finished address retrieval");
        console.log(results);
        return res.status(200).send(results);
    })

})

router.post("/api/address/edit", async (req, res, next) => {
    console.log(req.body)
    try {
        db.query('UPDATE address SET ? WHERE AddressID = ?', 
        [req.body, req.body.AddressID], function (error, results, fields){
            if (error) throw error;
            console.log("finished address update");
            return res.status(200).send(results);
        })
    } catch (error) {
    console.error(error);
    next(error);
    }
})

router.post("/api/address/add", async (req, res, next) => {
    try {
        db.query('INSERT INTO address SET ?', [req.body], function (error, results, fields){
            if (error) throw error;
            console.log("finished address add");
            return res.status(200).send(results);
        })
    } catch (error) {
    console.error(error);
    next(error);
    }
})

router.post("/api/address/delete", async (req, res, next) => {
    try {
        db.query('UPDATE address SET ActiveFlag = 0 WHERE AddressID = ?',[req.body.AddressID],
            function (error, results, fields) {
              if (error) throw error;
              console.log("finished address delete update");
              return res.status(200).send(results);
        })
    } catch (error) {
    console.error(error);
    next(error);
    }
})

router.get("/api/emergency", (req, res) => {
    db.query('SELECT * FROM emergencycontact WHERE PatientID = ? AND ActiveFlag = 1', 
    [req.query.HealthCardNumberID], function (error, results, fields){
        if (error) throw error;
        console.log("finished emergencycontact retrieval");
        return res.status(200).send(results);
    })

})

router.post("/api/emergency/edit", async (req, res, next) => {
    try {
        db.query('UPDATE emergencycontact SET ? WHERE ContactID = ?', 
        [req.body, req.body.ContactID], function (error, results, fields){
            if (error) throw error;
            console.log("finished emergencycontact update");
            return res.status(200).send(results);
        })
    } catch (error) {
    console.error(error);
    next(error);
    }
})

router.post("/api/emergency/add", async (req, res, next) => {
    try {
        db.query('INSERT INTO emergencycontact SET ?', [req.body], function (error, results, fields){
            if (error) throw error;
            console.log("finished emergencycontact add");
            return res.status(200).send(results);
        })
    } catch (error) {
    console.error(error);
    next(error);
    }
})

router.post("/api/emergency/delete", async (req, res, next) => {
    try {
        db.query("UPDATE emergencycontact SET ActiveFlag = 0 WHERE ContactID = ?",[req.body.ContactID],
            function (error, results, fields) {
              if (error) throw error;
              console.log("finished emergencycontact delete update");
              return res.status(200).send(results);
        })
    } catch (error) {
    console.error(error);
    next(error);
    }
})

router.get("/api/notes", (req, res) => {
    db.query('SELECT * FROM notes WHERE PatientID = ? AND ActiveFlag = 1', 
    [req.query.HealthCardNumberID], function (error, results, fields){
        if (error) throw error;
        console.log("finished notes retrieval");
        return res.status(200).send(results);
    })

})

router.post("/api/notes/edit", async (req, res, next) => {
    try {
        db.query('UPDATE notes SET ? WHERE NoteID = ?', 
        [req.body, req.body.NoteID], function (error, results, fields){
            if (error) throw error;
            console.log("finished notes update");
            return res.status(200).send(results);
        })
    } catch (error) {
    console.error(error);
    next(error);
    }
})

router.post("/api/notes/add", async (req, res, next) => {
    try {
        db.query('INSERT INTO notes SET ?', [req.body], function (error, results, fields){
            if (error) throw error;
            console.log("finished notes add");
            return res.status(200).send(results);
        })
    } catch (error) {
    console.error(error);
    next(error);
    }
})

router.post("/api/notes/delete", async (req, res, next) => {
    try {
        db.query("UPDATE notes SET ActiveFlag = 0 WHERE NoteID = ?",[req.body.NoteID],
            function (error, results, fields) {
              if (error) throw error;
              console.log("finished notes delete update");
              return res.status(200).send(results);
        })
    } catch (error) {
    console.error(error);
    next(error);
    }
})

router.get("/api/summary", (req, res) => {
    db.query('SELECT * FROM patienthealthsummary WHERE PatientID = ? AND ActiveFlag = 1', 
    [req.query.HealthCardNumberID], function (error, results, fields){
        if (error) throw error;
        console.log("finished patienthealthsummary retrieval");
        return res.status(200).send(results);
    })

})

router.post("/api/summary/edit", async (req, res, next) => {
    try {
        db.query('UPDATE patienthealthsummary SET ? WHERE HealthSummaryID = ?', 
        [req.body, req.body.NoteID], function (error, results, fields){
            if (error) throw error;
            console.log("finished patienthealthsummary update");
            return res.status(200).send(results);
        })
    } catch (error) {
    console.error(error);
    next(error);
    }
})

router.post("/api/summary/add", async (req, res, next) => {
    try {
        db.query('INSERT INTO patienthealthsummary SET ?', [req.body], function (error, results, fields){
            if (error) throw error;
            console.log("finished summary add");
            return res.status(200).send(results);
        })
    } catch (error) {
    console.error(error);
    next(error);
    }
})

router.post("/api/summary/delete", async (req, res, next) => {
    try {
        db.query("UPDATE patienthealthsummary SET ActiveFlag = 0 WHERE HealthSummaryID = ?",[req.body.HealthSummaryID],
            function (error, results, fields) {
              if (error) throw error;
              console.log("finished patienthealthsummary delete update");
              return res.status(200).send(results);
        })
    } catch (error) {
    console.error(error);
    next(error);
    }
})

export default router
