import express from 'express';
import db from '../database/connection';

const router = express.Router();

// 

router.get("/api/patient", (req, res) => {
    db.query('SELECT * FROM patient', function (error, results, fields){
        if (error) throw error;
        console.log("finished retrieval");
        return res.status(200).send(results);
    })

})

router.post("/api/patient", async (req, res, next) => {
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

export default router
