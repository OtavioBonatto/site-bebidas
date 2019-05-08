const express = require('express')
const User = require('../../models/user')
const passport = require('passport')
const auth = require('../../middlewares/auth')
const router = new express.Router()

//mostra o formulário de registro
router.get('/users', (req, res) => {
    res.render('users/registrar')
})

//lógica do registro
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    await User.register(user, req.body.password, (err, user) => {
        if(err) {
            return res.render('users/registrar', {error: err.message});
        } 
        passport.authenticate('local')(req, res, () => {
            req.flash('success', `Registrado com sucesso, bem vindo(a): ${req.body.username}`)
            res.redirect('/');
        });
    });
})

//mostra o formulario de login
router.get('/users/login', (req, res) => {
    res.render('users/login')
})

//lógica do login
router.post('/users/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: 'Senha ou usuario inválido'
    })
)

//rota de logout
router.get('/users/logout', auth, (req, res) => {
    req.logout()
    res.redirect('/')
})

//rota do perfil
router.get('/users/me', auth, async (req, res) => {
    try {
        const user = await User.findOne(req.user)
        res.render('users/perfil', { usuario: user })
    } catch(e) {
        console.log(e)
    }
})

//logica para modificar o perfil
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['username', 'sobrenome', 'email', 'endereco', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        req.flash('error', 'alteração inválida')
        res.redirect('back')
    }

    try {
        const user = req.user
        updates.forEach((update) => user[update] = req.body[update])

        await user.save()
        req.flash('success', 'alterações feitas com sucesso')
    } catch(e) {
        res.status(400).send(e)
    }
})

//delete o usuario
router.delete('/users/me', auth, async(req, res) => {
    try {
        await req.user.remove()
        req.flash('success', 'usuario removido com sucesso')
        res.redirect('/')
    } catch(e) {
        res.status(500).send(e)
    }
})

module.exports = router