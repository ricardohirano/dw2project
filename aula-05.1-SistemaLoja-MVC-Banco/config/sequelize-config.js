// Importando o Sequelize
<<<<<<< HEAD
import Sequelize from "sequelize";
// Criando os dados de conexão com o banco de dados
const connection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "admin", //Alunos deixem a senha em branco
  // Comente essa linha na primeira execução da aplicação
  //database: 'loja',
  timezone: "-03:00",
});
=======
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
>>>>>>> d68882fa8ebc35307e360a9487ee3dca08445431
export default connection;
