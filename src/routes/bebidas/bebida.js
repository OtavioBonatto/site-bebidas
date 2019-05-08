const express = require('express')
const Bebida = require('../../models/bebida')
const router = new express.Router()

router.get('/', async (req, res) => {
    try {
        const bebidas = await Bebida.find({})
        res.render('bebidas/bebidas', { bebidas: bebidas })
    } catch(e) {
        res.status(500).send(e)
    }
    
    
})

module.exports = router