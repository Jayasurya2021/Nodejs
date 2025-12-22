const express = require('express');
const router = express.Router()
const usercontroller = require('../controllers/userController')

router.get('/data',usercontroller.data)

module.exports = router;