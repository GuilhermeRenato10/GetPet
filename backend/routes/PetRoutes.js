const router = require('express').Router()

const PetController = require('../controllers/PetController')

//middlewares
const verifyToken = require('../helpers/v')

router.post('/create', PetController.create)

module.exports = router