const jwt = require('jsonwebtoken')
const SecretJWT = 'carlossoares123@'

const generateToken = payload => jwt.sign(payload, SecretJWT, { expiresIn: '1h' })

const verifyToken = token => jwt.verify(token, SecretJWT)

module.exports = { generateToken, verifyToken }
