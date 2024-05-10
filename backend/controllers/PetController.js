const Pet = require('../models/Pets')
const User = require('../models/User')

//helpers
const VerifyToken = require('../helpers/VerifyToken')
const Pets = require('../models/Pets')

module.exports = class PetController {
    // criação do pet
    static async create(req, res) {
        
        const {name, age, weight, color} = req.body
        const available = true

    // Validações

    if(!name){
        res.status(422).json({ message: 'O Nome é Obrigatório!'})
        return
    }

    if(!age){
        res.status(422).json({ message: 'A idade é Obrigatória!'})
        return
    }

    if(!weight){
        res.status(422).json({ message: 'O Peso é Obrigatório!'})
        return
    }

    if(!color){
        res.status(422).json({ message: 'A cor é Obrigatória!'})
        return
    }

    // pegando o dono do pet
    const user = await User.findById(req.id)

    // create pet
    const pet = new Pet({
        name,
        age,
        weight,
        color,
        available,
        user: {
            _id: user._id,
            name: user.name,
            phone: user.phone
        },
    })

    try {

        const newPet = await pet.save()
        res.status(201).json({message: 'Pet Cadastrado com sucesso',
            newPet,
        })

    }catch (error) {
        res.status(500).json({ message: error})
    }

    }

    static async getAll(req, res) {

        const pets = await Pet.find().sort('-createdAt')
        
        res.status(200).json({
            pets: pets,
        })
    }

    static async getAllUserPets(req, res) {

        // pegando o user pelo id
        const user = await User.findById(req.id)

        const pets = await Pet.find({'user._id': user._id}).sort('-createdAt')

        res.status(200).json({
            pets,
        })
    }
    
}