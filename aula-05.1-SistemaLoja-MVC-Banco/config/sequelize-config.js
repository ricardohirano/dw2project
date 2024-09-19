// Importando o Sequelize
import Sequelize from "sequelize"

// Criando os dados de conexao com o banco de dados
const connection = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '',//deixar em branco
    // comente essa linha na primeira execucao da aplicacao
    //database: 'loja',
    timezone: '-03:00'
})
export default connection;
