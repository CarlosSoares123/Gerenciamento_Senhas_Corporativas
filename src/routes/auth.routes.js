const express = require('express')
const router = express.Router()

const VerifyToken =  require('../middlewares/authMiddleware')
const registerControllers = require('../controllers/registerControllers')
const loginControllers = require('../controllers/loginControllers')

router.post('/register', VerifyToken ,registerControllers.register)
router.post('/login', loginControllers.login)

module.exports = router 
