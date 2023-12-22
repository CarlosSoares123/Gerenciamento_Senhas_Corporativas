const express = require('express')
const router = express.Router()
const VerifyToken = require('../middlewares/authMiddleware')
const adminControllers = require('../controllers/admin/isAdmin')
const registerAdminControllers = require('../controllers/admin/registerAdmin')

router.post('/register', registerAdminControllers.register)

router.get('/users', VerifyToken, adminControllers.getUsers)
router.get('/users/:id', VerifyToken, adminControllers.getUserId)
router.get('/users/:id/activities', VerifyToken, adminControllers.getUserActivities)  
router.get('/activities', VerifyToken, adminControllers.getActivityUsers)
router.put('/users/:id/block', VerifyToken, adminControllers.updateUsers)
router.delete('/deleteUsers/:id', VerifyToken, adminControllers.deleteUser)

module.exports = router
