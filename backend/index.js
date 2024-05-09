const express = require('express')
const UserRoutes = require('./routes/UserRoutes')
const PetRoutes = require('./routes/PetRoutes')
const app = express()

// Config JSON Response
app.use(express.json())

// Routes
app.use('/users', UserRoutes)
app.use('/pets', PetRoutes)
app.listen(5000)