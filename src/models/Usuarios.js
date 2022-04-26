import conn from "../database/db.js"
import Sequelize from 'sequelize'

const Usuario = conn.define('usuarios', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
})


// Usuario.sync({ force: true })

export default Usuario