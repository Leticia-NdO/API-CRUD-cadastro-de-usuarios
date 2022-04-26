import Sequelize from "sequelize";

const conn = new Sequelize('code_drops_crud', 'root', 'root', {
    host: "localhost",
    dialect: 'mariadb',
    // query: { raw: true }
})

conn.authenticate().then(() => {
    console.log('Conexão com o banco de dados realizada com sucesso!')
}).catch(() => {
    console.error("Erro: Falha na conexão com o banco de dados.")
})


export default conn