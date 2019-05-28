const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
require('./db/mongoose')
const app = express()
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const passport = require('passport')
const expressSession = require('express-session')
const LocalStrategy = require('passport-local')
const MongoStore = require('connect-mongo')(expressSession)
const seedDB = require('./seeds')

const User = require('./models/user')

const publicDirectoryPath = path.join(__dirname, './public')

//rotas
const bebidasRouter = require('./routes/bebidas/bebida')
const usersRouter = require('./routes/users/user')
const carrinhoRouter = require('./routes/carrinho/carrinho')
const finalizarRouter = require('./routes/finalizar/finalizar')

seedDB()

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(publicDirectoryPath))
app.use(flash())

app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 * 1000 }    
}));

//passport
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    res.locals.usuarioAtual = req.user
    res.locals.error = req.flash('error')
    res.locals.success = req.flash('success')
    next()
})

app.use(bebidasRouter)
app.use(usersRouter)
app.use(carrinhoRouter)
app.use(finalizarRouter)

app.listen(process.env.PORT, () => console.log('Server running'))