const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pedidoSchema = new Schema({
    items: {
        type: Object,
        required: true
    },
    endereco: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    precoTotal: {
        type: Number,
        required: true
    },
    paymentId: {
        type: String
    }
})

const Pedido = mongoose.model('Pedido', pedidoSchema)
module.exports = Pedido