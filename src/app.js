import express, { request, response } from "express"
import { routes } from "./routes.js"
import conn from './database/db.js'
import { engine } from 'express-handlebars'
import bodyParser from 'body-parser'
import Usuario from "./models/Usuarios.js"
import { Address } from "./models/Users_Address.js"
import passport from 'passport'
import flash from 'express-flash'
import session from 'express-session'
import dotenv from 'dotenv'
import sequelize from 'sequelize'
import methodOverride from 'method-override'


dotenv.config()
const app = express()

import initializePassport from '../passport-config.js'
initializePassport(passport)

// Handlebars
app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Middleware
app.use((request, response, next) => {
    response.locals.error = request.flash('error')
    response.locals.user = request.user || null
    response.locals.address = request.address || null
    next()
})

app.use(methodOverride('_method'))

app.use(routes)

app.listen(5000, () => { console.log('Server is running! Access http://localhost:5000/ to see results!') })