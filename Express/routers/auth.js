const router = require('express').Router()

const {registerData, LoginData} = require('../controllers/authontication')


router.post('/Register',registerData)
router.get('/login',LoginData)


module.exports = router