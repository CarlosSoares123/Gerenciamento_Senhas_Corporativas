const jwt = require('jsonwebtoken')

const VerifyToken = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ error: 'Token not provided.' })
  }
  // Remova espaços em branco e verifique a presença da palavra-chave "Bearer"
  const tokenParts = token.split(' ')
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Invalid token format.' })
  }

  const cleanedToken = tokenParts[1]
  jwt.verify(cleanedToken, 'carlosSoares123@', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Authentication Error.' })
    }

    req.user = decoded
    next()
  })
}

module.exports = VerifyToken