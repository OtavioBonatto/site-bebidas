const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/auth')
const carrinho = require('../../models/carrinho')
const usuario = require('../../models/user')
const pedido = require('../../models/pedido')

//mostra o formulario de pagamento
router.get('/checkout', auth,  (req, res) => {
    if(!req.session.carrinho || req.session.carrinho.precoTotal <= 0) {
        return res.redirect('/carrinho')
    }

    const novoCarrinho = new carrinho(req.session.carrinho)
    res.render('carrinho/checkout', { total: novoCarrinho.precoTotal, endereco: req.user.endereco, bebidas: novoCarrinho.criaArray() })
})

//adiciona um novo endereco
router.post('/add-endereco', auth, async (req, res) => {
    try {
        const user = await usuario.findOne(req.user)
        user.endereco = `${req.body.endereco}, ${req.body.numero}`
        console.log(user)
        await user.save()
        req.flash('success', 'Endereço alterado com sucesso')
        res.redirect('back')
    } catch(e) {
        console.log(e)
    }
})

//logica do pagamento com stripe
router.post('/checkout', auth, async (req, res) => {
    if(!req.session.carrinho) {
        return res.redirect('/carrinho')
    }

    const novoCarrinho = new carrinho(req.session.carrinho)
    const stripe = require("stripe")(process.env.STRIPE_KEY)

    //recebe o tokenId de pagamento do form
    const token = req.body.reservation.stripe_token


    stripe.charges.create({
        amount: novoCarrinho.precoTotal * 100,
        currency: 'BRL',
        description: 'cobrança teste',
        source: token,
        }, function(err, charge) {
            if (err) {
                console.log(err);
                res.redirect('/checkout');
            } else {                
                req.session.carrinho = null;
                req.flash('success', 'Compra realizada com sucesso')
                res.redirect('/');
            }
  
    });
})

//logica do pagamento sem stripe
router.get('/finalizar', auth,  async (req, res) => {
    if(!req.session.carrinho.precoTotal  || req.session.carrinho.precoTotal <= 0) {
        return res.redirect('/carrinho');
    }

    const novoCarrinho = new carrinho(req.session.carrinho)

    const novoPedido = new pedido({
        items: novoCarrinho.items,
        endereco: req.user.endereco,
        name: req.user.username,
        precoTotal: novoCarrinho.precoTotal
    })
    console.log(novoPedido)

    try {
        await novoPedido.save()
        req.session.carrinho = null
        req.flash('success', 'Compra realizada com sucesso')
        res.redirect('/');
    } catch(e) {
        console.log(e)
    }    
})

module.exports = router