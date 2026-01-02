const express = require('express');
const router = express.Router()
const {postData, getData} = require('../controllers/userController')

router.post('/data',postData)
router.get('/getdata/:id',getData)

module.exports = router;