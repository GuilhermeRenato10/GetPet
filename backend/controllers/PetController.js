const Pet = require('../models/Pets')

module.exports = class PetController {
    // criação do pet
    static async create(req, res) {
        res.json({ message: 'Pet Criado com sucesso!'})
    }
}