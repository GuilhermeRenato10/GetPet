const router = require('express').Router()
const VerifyToken = require('../helpers/VerifyToken')
const UserController = require('../controllers/UserController')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
// router.get('/checkuser', getToken, UserController.checkUser)
router.get('/:id', UserController.getUserById)
router.patch('/edit/:id', VerifyToken, UserController.editUser)
router.delete('/:id', VerifyToken, UserController.deleteUser)



module.exports = router