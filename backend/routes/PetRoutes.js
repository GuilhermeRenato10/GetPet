const router = require('express').Router()

const PetController = require('../controllers/PetController')
const VerifyToken = require('../helpers/VerifyToken')

//middlewares

router.post('/create', VerifyToken, PetController.create);
router.get('/', PetController.getAll);
router.get('/mypets', VerifyToken, PetController.getAllUserPets);
router.get('/:id', PetController.getPetById);
router.delete('/:id', VerifyToken, PetController.removePetById);
router.patch('/:id', VerifyToken, PetController.UpdatePetById);
router.patch('/schedule/:id', VerifyToken, PetController.Schedule); 
router.patch('/conclude/:id', VerifyToken, PetController.concludeAdoption);


module.exports = router