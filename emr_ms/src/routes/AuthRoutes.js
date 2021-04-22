import express from 'express';
import db from '../database/connection';
import * as jwt from 'jsonwebtoken'
const argon2 = require('argon2');



const router = express.Router();

router.get("/api/auth", (req, res) => {
    try{
        const {username, password, superAdminID} = req.body

        if (!username || !password){
            return res.status(401).json({message: "incorrect credentials provided"})
        }

        db.query('SELECT * FROM test WHERE Username = ?', [username], async function(error, results, fields) {
            if (error) throw error
            if(!results || !(await argon2.verify(results[0].password, password))){
                return res.status(401).json({message: "incorrect credentials provided"})
            } else {
                const token = jwt.sign({username}, process.env.JWT_SECRET, {expiresIn: '5m'})
                console.log("Logged in as: " + username);
                if(superAdminID){
                    console.log(username + " is also a SuperAdmin");
                }
                return res.send({token});          
            }
        });
    } catch(err){
        console.log(err)
    }
    // db.query('SELECT * FROM test', function (error, results, fields){
    //     if (error) throw error;
    //     console.log("finished retrieval");
    //     return res.status(200).send(results);
    // })
})

//use to add users through Postman with encrypted password. *Needed to use logIn later*.
router.post('/api/users', async (req, res) => {
    req.body.password = await argon2.hash(req.body.Password)
    const query = `INSERT INTO user VALUES ('${req.body.CareProviderID}', '${req.body.SuperAdminID}', '${req.body.Username}', "${req.body.Password}");`
    await db.query(query,function(error, results, fields){
        if (error) throw error
        return res.status(201).send(results)
    })
    
})

export default router
