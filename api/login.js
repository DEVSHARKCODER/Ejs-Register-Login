const pool = require('../lib/db');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(401).json({
            message: 'Please fill in all fields.'
        });
    }

    try {
        // คำสั่ง SQL เพื่อดึงข้อมูลผู้ใช้จากฐานข้อมูล
        const checkuserSQL = await pool.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, username]);

        // ตรวจสอบว่ามีผู้ใช้ในฐานข้อมูลหรือไม่
        if (checkuserSQL.length === 0) {
            return res.status(401).json({
                message: "No username or email found."
            });
        }

        const user = checkuserSQL[0]; 
        console.log('User found:', user);

        // ตรวจสอบว่าผู้ใช้มีรหัสผ่านหรือไม่
        if (!user.password) {
            return res.status(401).json({
                message: "User password not found."
            });
        }

        // เปรียบเทียบรหัสผ่านที่ผู้ใช้ป้อนกับรหัสผ่านที่เก็บในฐานข้อมูล
        const isMatch = await bcrypt.compare(password, user.password);
      
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid password."
            });
        }

        // ส่งข้อความยืนยันการเข้าสู่ระบบสำเร็จ
        return res.status(200).json({
            message: "Login successful."
        });

    } catch (error) {
        console.log("Server Error:", error);
        return res.status(500).json({
            message: "Server Error", error
        });
    }
});

module.exports = router;