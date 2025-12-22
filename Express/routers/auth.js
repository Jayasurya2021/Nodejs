const express = require('express')
const router = express.router()
const authocontroller = require('../controllers/authoconteroller')

router.post('/verification',authocontroller)