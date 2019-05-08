const express = require('express')
const router = express.Router()
const Bebida = require('../../models/bebida')
const Carrinho = require('../../models/carrinho')
const auth = require('../../middlewares/auth')

//mostra o carrinho
router.get('/carrinho', auth, (req, res) => {
    if(!req.session.carrinho) {
        return res.render('carrinho/carrinho', { bebidas: null })
    }

    const carrinho = new Carrinho(req.session.carrinho)

    res.render('carrinho/carrinho', { bebidas: carrinho.criaArray(), precoTotal: carrinho.precoTotal })
})

//lógica para adicionar bebidas no carrinho
router.post('/add-carrinho/:id', auth, async (req, res) => {
    const bebidaId = req.params.id
    const qtd = req.body.qtd
    const carrinho = new Carrinho(req.session.carrinho ? req.session.carrinho: {})

    const bebida = await Bebida.findById(bebidaId)

    try {
        carrinho.addItem(bebida, bebidaId, qtd)
        req.session.carrinho = carrinho
        req.flash('success', 'bebida adicionada ao carrinho.')
        res.redirect('back')
    } catch(e) {
        console.log(e)
    }
})

//deleta bebida do carrinho
router.get('/remove-carrinho/:id', (req, res) => {
    const bebidaId = req.params.id
    const carrinho = new Carrinho(req.session.carrinho)

    carrinho.delItem(bebidaId)
    req.session.carrinho = carrinho
    res.redirect('/carrinho')
})

module.exports = router