import conn from "../database/db.js"
import Sequelize from 'sequelize'
import Usuario from "./Usuarios.js";



const Address = conn.define('users_Address', {
    pais: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    estado: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    municipio: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cep: {
        type: Sequelize.STRING,
        allowNull: false
    },
    rua: {
        type: Sequelize.STRING,
        allowNull: false
    },
    numero: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // user_id: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: Usuario,
    //         key: "id"
    //     }
    // },
},

{
    timestamps: false
});

Usuario.hasOne(Address, {
    foreignKey: {
        name: 'user_Id',
        allowNull: false
    }
})

// // Address.belongsTo(Usuario)

// Address.sync({ force: true })

export { Address }