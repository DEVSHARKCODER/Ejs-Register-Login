const express = require('express')
const router = express.Router();

// Register
const RegistrationAPI = require('../api/registration')
// Login
const LoginAPI = require('../api/login');
router.use('/' , RegistrationAPI,LoginAPI)




module.exports= router;