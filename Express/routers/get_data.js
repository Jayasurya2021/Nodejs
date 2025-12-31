const express = require('express');
const router = express.Router()
const {postData} = require('../controllers/userController')

router.post('/data',postData)

module.exports = router;