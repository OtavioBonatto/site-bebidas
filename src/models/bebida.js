const mongoose = require('mongoose')

const bebidaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    imagem: {
        type: String,
        required: true,
        trim: true
    },
    preco: {
        type: Number,
        required: true,
        trim: true
    }
})

const Bebida = mongoose.model('Bebida', bebidaSchema)
module.exports = Bebida