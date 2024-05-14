const Pet = require('../models/Pets')
const User = require('../models/User')


//helpers
const VerifyToken = require('../helpers/VerifyToken')
const Pets = require('../models/Pets')
// checar se o objectid é válido/correto
const ObjectId = require('mongoose').Types.ObjectId

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
    
    static async getPetById(req, res) {

        // id pela URL
        const id = req.params.id

        if(!ObjectId.isValid(id)) {
            res.status(422).json({ message: 'ID Incorreto!' })
            return
        }

        const pet = await Pet.findOne({_id: id})

        if(!pet) {
            res.status(404).json({ message: 'Pet Não Encontrado!'})
            return
        }

        res.status(200).json({
            pet: pet,
        })
     }

     static async removePetById(req, res) {

        const id = req.params.id

        // verificando se o id é válido
        if(!ObjectId.isValid(id)) {
            res.status(422).json({ message: 'ID Incorreto!' })
            return
        }

        // verificando se o pet existe
        const pet = await Pet.findOne({_id: id})


        if(!pet) {
            res.status(404).json({ message: 'Pet Não Encontrado!'})
            return
        }

        // verificando se o usuário logado registrou o pet
        const user = await User.findById(req.id)

        if(pet.user._id.toString() !== user._id.toString()){
            res.status(422).json({message: 'Ocorreu um Problema com sua solicitação!'})
            return
        }

        await Pet.findByIdAndDelete(id)
        res.status(200).json({ message: 'Pet Deletado com Sucesso!'})
     }

     // nessa função, optei por realizar todas as validações feitas anteriormente (por uma questão de testes)
     static async UpdatePetById(req, res) {

        const id = req.params.id

        // verificando se o id é válido
        if(!ObjectId.isValid(id)) {
            res.status(422).json({ message: 'ID Incorreto!' })
            return
        }

        // verificando se o pet existe
        const pet = await Pet.findOne({_id: id})


        if(!pet) {
            res.status(404).json({ message: 'Pet Não Encontrado!'})
            return
        }

        // verificando se o usuário logado registrou o pet
        const user = await User.findById(req.id)

        if(pet.user._id.toString() !== user._id.toString()){
            res.status(422).json({message: 'Ocorreu um Problema com sua solicitação!'})
            return
        }

        const {name, age, weight, color} = req.body

        const updatedData = {}

        const available = true

        // validações dos campos normais:
         if(!name){
            res.status(422).json({ message: 'O Nome é Obrigatório!'})
            return
         }else {
            updatedData.name = name
         }
    
         if(!age){
            res.status(422).json({ message: 'A idade é Obrigatória!'})
            return
         }else {
            updatedData.age = age
         }
    
         if(!weight){
            res.status(422).json({ message: 'O Peso é Obrigatório!'})
            return
         }else {
            updatedData.weight = weight
         }
    
        if(!color){
            res.status(422).json({ message: 'A cor é Obrigatória!'})
            return
        }else {
            updatedData.color = color
        }

        await Pet.findByIdAndUpdate(id, updatedData)

        res.status(200).json({ message: 'Pet Atualizado com Sucesso!'})
     }

     static async Schedule (req, res) {

        const id = req.params.id

        const pet = await Pet.findOne({_id: id})


        if(!pet) {
            res.status(404).json({ message: 'Pet Não Encontrado!'})
            return
        }

        //verificando se o usuário registrou seu pet

        const user = await User.findById(req.id)

        if(pet.user._id.equals(user._id)){
            res.status(422).json({message: 'Você não pode agendar uma visita com seu próprio Pet!'})
            return
        }

        // verificando se o usuário ja agendou uma visita
        if(pet.adopter) {
            if(pet.adopter._id.equals(user._id)){
                res.status(422).json({message: 'Você já agendou uma visita para este Pet!'})
                return
            }
        }

        // add user to pet
        pet.adopter = {
            _id: user._id,
            name: user.name,    
        }

        await Pet.findByIdAndUpdate(id, pet)
        res.status(200).json({ message: `A Visita foi agendada com sucesso, entre em contato com ${pet.user.name} pelo telefone ${pet.user.phone}`})
    }

    static async concludeAdoption (req, res) {
        const id = req.params.id
        try{
            const pet = await Pet.findOne({_id: id});
            // if(petUserId.equals(userId)){
            //     res.status(422).json({message: 'Houve um problema em processar os dados, tente novamente!'})
            //     return

            // Não estou entendendo o comportamento do mongodb nesse pet.findOne, por que quando ele não encontra um ID dentro do banco cadastrado
            // ele volta um erro imenso ao inves de um array vazio, o que atrapalha toda a lógica, alem disso, mesmo quando ele encontra um ID
            // ele volta resultados no modo new objectID, que não estou conseguindo equiparar e diferenciar eles para dar andamento na lógica
            // por isso fiz try catch, quando ele retornava o erro, ele quebrava aplicação

            // }
            const user = await User.findById(req.id)
            console.log(pet.user._id);
            console.log(user._id);
            pet.available = false
            await Pet.findByIdAndUpdate(id , pet)
            // res.status(200).json({ message: 'Parabéns!! O ciclo de adoção foi realizado com sucesso!'})

            await Pet.findByIdAndUpdate(id, pet)
            res.status(200).json({ message: `Seu Pet ${pet.name} foi adotado por ${pet.adopter.name}`})
        }catch {
            res.status(404).json({ message: 'Pet Não Encontrado!'})
            return 
        }     

    }
}