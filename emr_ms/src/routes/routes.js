import express from 'express';
import db from '../database/connection';

const router = express.Router();

// 

router.get("/api/patient", (req, res) => {
    db.query('SELECT * FROM patient WHERE ActiveFlag = 1', function (error, results, fields){
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

router.get("/api/careprovider", (req, res) => {
    db.query('SELECT * FROM careprovider WHERE ActiveFlag = 1', function (error, results, fields){
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


export default router
