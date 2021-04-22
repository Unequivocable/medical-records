import express from 'express';
import db from '../database/connection';

const router = express.Router();

// 

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



router.get("/api/p2c/patient", (req, res) => {
    let query = () => {
        if(req.query.CareProviderID) {
            return `SELECT patient.HealthCardNumberID, patient.firstName, patient.lastName, patient.Phone FROM patient JOIN patienttocareprovider ON patient.HealthCardNumberID = patienttocareprovider.PatientID WHERE patient.HealthCardNumberID = ${req.query.HealthCardNumberID} AND patienttocareprovider.CareProviderID = ${req.query.CareProviderID} AND patienttocareprovider.ActiveFlag = 1`
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
            return `SELECT patient.HealthCardNumberID, patient.firstName, patient.lastName, patient.Phone FROM patient JOIN patienttocareprovider ON patient.HealthCardNumberID = patienttocareprovider.PatientID WHERE patient.lastName = '${req.query.lastName}' AND patienttocareprovider.CareProviderID = ${req.query.CareProviderID} AND patienttocareprovider.ActiveFlag = 1`
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
            return `SELECT patient.HealthCardNumberID, patient.firstName, patient.lastName, patient.Phone FROM patient JOIN patienttocareprovider ON patient.HealthCardNumberID = patienttocareprovider.PatientID WHERE patienttocareprovider.CareProviderID = ${req.query.CareProviderID} AND patienttocareprovider.ActiveFlag = 1`
        } else { 
            return `SELECT patient.HealthCardNumberID, patient.firstName, patient.lastName, patient.Phone, patienttocareprovider.CareProviderID FROM patient JOIN patienttocareprovider ON patient.HealthCardNumberID = patienttocareprovider.PatientID WHERE patient.ActiveFlag = 1`
        }
    }
    db.query(query(), function (error, results, fields){
        if (error) throw error;
        console.log("finished search");
        return res.status(200).send(results);
    })

})

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

export default router
