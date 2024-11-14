const pool = require('../lib/db');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/api/register', async (req, res) => {
    const { firstname, lastname, username, email, password } = req.body;
    
    if(!firstname || !lastname || !username || !email || !password){
        return res.status(400).json({
            message: 'Please provide all required fields'
        })
    }
    if(password.length < 6){
        return res.status(400).json({
            message: 'Password must be a minimum of 6 characters'
        });
    }
    

    try{

        const [existingUserCheck] = await pool.query('SELECT * FROM users WHERE username = ? OR email = ?' , [username , email]);
        if(existingUserCheck.length > 0){
            return res.status(400).json({
                message: 'Username or Email is already taken'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const insertSQL = 'INSERT INTO users (firstname, lastname, username, email, password) VALUES (?, ?, ?, ?, ?)';
        const [result] = await pool.query(insertSQL , [firstname, lastname, username, email, hashedPassword]);

        return res.status(201).json({
            message: "Registration successful",
            users: result
        })
    }
    catch(error){
        console.error("Server Error:", error);
        return res.status(500).json({
            message: 'Server error, please try again later'
        });
    }
});

module.exports = router;
