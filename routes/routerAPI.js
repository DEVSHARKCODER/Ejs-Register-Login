const express = require('express')
const router = express.Router();

// Register
const RegistrationAPI = require('../api/registration')
router.use('/api' , RegistrationAPI)

// Login
const LoginAPI = require('../api/login');
router.use('/api' , LoginAPI)

module.exports= router;