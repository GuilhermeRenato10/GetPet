const express = require('express')
const UserRoutes = require('./routes/UserRoutes')

const app = express()

// Config JSON Response
app.use(express.json())

// Routes
app.use('/users', UserRoutes)
app.listen(5000)