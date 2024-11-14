const pool = require('../lib/db');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
   
    if (!username || !password) {
        return res.status(400).json({
            message: "Please enter both username and password."
        });
    }

    try {
        const [userCheck] = await pool.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, username]);

        if (userCheck.length === 0) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, userCheck[0].password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Incorrect password."
            });
        }

        const token =jwt.sign(
            {id: userCheck[0].id, username: userCheck[0].username , role: userCheck[0].role},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )

        res.cookie('token' , token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000,
            sameSite: 'Strict'
        })


        return res.status(200).json({
            message: "Login successful",
        });
    } catch (error) {
        console.log("Server Error:", error);
        return res.status(500).json({
            message: "Server Error: " + error.message
        });
    }
});

module.exports = router;
