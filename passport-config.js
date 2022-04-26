// import LocalStrategy from 'passport-local'
import bcrypt from 'bcrypt'
import LocalStrategy from 'passport-local'
import Usuario from './src/models/Usuarios.js'
import sequelize from 'sequelize'

const localStrategy = LocalStrategy.Strategy

function initialize(passport) {

    const authenticateUser = async (email, senha, done) => {

        Usuario.findOne({ where: { email: email } }).then((usuario) => {
            if (!usuario) {
                return done(null, false, { message: "Essa conta não existe" })
            }

            bcrypt.compare(senha, usuario.senha, (erro, batem) => {
                if (batem) {
                    return done(null, usuario)
                } else {
                    return done(null, false, { message: "senha incorreta" })
                }
            })
        })
    }

    passport.use(new localStrategy({ usernameField: 'email', passwordField: 'senha' }, authenticateUser))
    passport.serializeUser((usuario, done) => {
        done(null, usuario)
    })
    passport.deserializeUser((usuario, done) => {
        done(null, usuario)
    })
}



export default initialize
