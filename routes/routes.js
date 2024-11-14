const express = require('express')
const router = express.Router();
const {verifyToken, verifyUserOrAdmin, verifyAdmin } = require('../middleware')
// Index
router.get('/' ,verifyToken,verifyUserOrAdmin, (req,res)=>{
    res.render('index')
})

// Register
router.get('/register' , (req,res)=>{
    res.render('register')
})

// Login
router.get('/login' , (req,res)=>{
    res.render('login')
})

// Admin Page
router.get('/admin' ,verifyToken,verifyAdmin, (req,res)=>{
    res.render('admin')
})

// Dashbaord Page
router.get('/dashboard', verifyToken, verifyUserOrAdmin, (req, res) => {
   
    res.render('dashboard'); 
});




module.exports= router;