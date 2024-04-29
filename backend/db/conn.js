const mongoose = require('mongoose')

require('dotenv').config()

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);


async function main() {
    await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.lrwf8y1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    console.log('MongoDB Conectado!');
}

main().catch((err) => console.log(err))

module.exports = mongoose
     

 