const express = require('express')
const router = express.Router();
const RegistrationAPI = require('../api/registration')

router.use('/api' , RegistrationAPI)

module.exports= router;