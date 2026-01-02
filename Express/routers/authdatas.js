const express = require('express')
const router = express.Router()
const {postData, getData, updatedata, delectData} = require('../controllers/auth')

router.post('/authpost',postData)
router.get('/getdata/:id',getData )
router.put('/update/:id', updatedata)
router.delete('/delect/:id', delectData)

module.exports = router;