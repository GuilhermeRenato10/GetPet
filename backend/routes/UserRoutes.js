const router = require('express').Router()
const getToken = require('../helpers/get-token')
const UserController = require('../controllers/UserController')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
// router.get('/checkuser', UserController.checkUser)
router.get('/:id', UserController.getUserById)
router.patch('/edit/:id', getToken, UserController.editUser)
router.delete('/:id', UserController.deleteUser)



module.exports = router