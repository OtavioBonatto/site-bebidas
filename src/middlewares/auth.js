const auth = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next()
    }

    req.flash('error', 'Você precisa estar logado')
    res.redirect('/users/login')
}

module.exports = auth