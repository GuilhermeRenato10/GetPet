const router = require('express').Router()

const PetController = require('../controllers/PetController')
const VerifyToken = require('../helpers/VerifyToken')

//middlewares

router.post('/create', VerifyToken, PetController.create)
router.get('/', PetController.getAll)
router.get('/mypets', VerifyToken, PetController.getAllUserPets)

module.exports = router