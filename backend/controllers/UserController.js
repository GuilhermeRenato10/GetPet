const getToken = require('../helpers/get-token')
const createUserToken = require('../helpers/create-user-token')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



module.exports = class UserController{

    static async register(req, res){
        
        const {name, email, password, phone, confirmpassword} = req.body

        // validations: pois esses dados são obrigatórios e o usuário precisa de uma resposta caso
        // algum dado esteja errado

        if (!name){
            res.status(422).json({ message: 'O nome é obrigatório!!' })
            return
        }

        if (!email){
            res.status(422).json({ message: 'O email é obrigatório!!' })
            return
        }

        if (!password){
            res.status(422).json({ message: 'A senha é obrigatória!!' })
            return
        }

        if (!phone){
            res.status(422).json({ message: 'O telefone é obrigatório!!' })
            return
        }

        if (!confirmpassword){
            res.status(422).json({ message: 'A confirmação da senha é obrigatória!!' })
            return
        }

        if (password !== confirmpassword){
            res.status(422).json({ message: 'A senha e a confirmação de senha precisam ser iguais!'})
            return
        }

        // check if user exists
        const userExists = await User.findOne({email: email})

        if (userExists) {
            res.status(422).json({ message: 'Por favor, utilize outro email!'})
            return
        }

        // criar a senha
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        // criar o usuario
        const user = new User({
            name,
            email,
            phone,
            password: passwordHash, 
        })
        
        try{
            const newUser = await user.save()
           
            await createUserToken(newUser, req, res)
        }catch(error) {
            res.status(500).json({ message: error})
        }
     }

     static async login(req, res) {

        const { email, password } = req.body

        if (!email) {
            res.status(422).json({ message: 'O email é obrigatório!!'})
            return
        }

        if (!password) {
            res.status(422).json({ message: 'A senha é obrigatória!!'})
            return
        }

        const user = await User.findOne({email: email})

        if (!user) {
            res.status(422).json({ message: 'Não existe usuário cadastrado com esse email!'})
            return
        }
        
        // check if password match with db password
        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            res.status(422).json({ message: 'Senha Inválida :('})
            return
        }

        await createUserToken(user, req, res)
     }

     // User verification by token
     static async checkUser(req, res) {

        let currentUser
        

        if(req.headers.authorization) {

            const token = getToken(req)
            const decoded = jwt.verify(token, 'nossosecret')

            currentUser = await User.findById(decoded.id)

            currentUser.password = undefined

        } else {
            currentUser = null
        }

        res.status(200).send(currentUser)
     }

     static async getUserById(req, res) {

        const id = req.params.id

        const user = await User.findById(id).select('-password')

        if (!user) {
            res.status(422).json({ message: 'Usuário não encontrado!'})
            return
        }

        res.status(200).json({ user })
     }

     static async editUser(req, res) {

        const { name, email, password, phone} = req.body;

        const userId = req.user.id;

        const user = await User.findById(userId);

        let passwordHash = user.password;
        if (password) {
            salt = await bcrypt.genSalt(12)
            passwordHash = await bcrypt.hash(password, salt);
        }
      
        await User.findByIdAndUpdate(userId, {
            name: name,
            email: email,
            password: passwordHash,
            phone: phone  
        })

        res.status(200).json({ message: 'Usuário atualizado com sucesso!'})
        return

     }

     static async deleteUser(req, res) {
        const userId = req.params.id

        const user = await User.findById(userId);

        if (!user){
            res.status(404).json({ message: 'Esse usuário não existe!'})
            return
        }
        try {
            await user.deleteOne({_id: userId})
            res.status(200).json({ message: 'Usuário deletado com sucesso!'})
        }catch (error) {
            res.status(500).json({ error: error})
        }
     }
}