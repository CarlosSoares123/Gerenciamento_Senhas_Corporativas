const express = require('express')
const recoveryControllers = require('../controllers/recoveryControllers')

const router = express.Router()

router.post('/request-password-resert', recoveryControllers.requestPasswordReset)
router.post('/reset-password', recoveryControllers.resetPassword)

module.exports = router