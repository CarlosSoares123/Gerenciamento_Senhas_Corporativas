const express = require('express')
const bodyParser  = require('body-parser')
const morgan = require('morgan')

const authRoutes = require('./routes/auth.routes')
const recoveryRoutes = require('./routes/recovery.routes')
const adminRoutes = require('./routes/admin.routes')

const app = express()

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/auth', authRoutes)
app.use('/recovery', recoveryRoutes)
app.use('/admin', adminRoutes)

module.exports = app