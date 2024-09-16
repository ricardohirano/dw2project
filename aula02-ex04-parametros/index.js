// Importando o Express na aplicação
const express = require("express"); //CommonJS Modules
// Criando uma instância do Express
const app = express();

// Definindo o EJS como renderizador de páginas
app.set("view engine", "ejs");

// CRIANDO A ROTA PRINCIPAL
app.get("/", (req, res) => {
  // Será renderizada a página index.ejs que está na pasta 'views'
  res.render("index");
});

// ROTA PERFIL
app.get("/perfil/:nome?", (req, res) =>{
  var nome = req.params.nome
  res.render("perfil", { nome: nome});
});
/*  if(nome){
    res.send(`<h2>Ola, $node{nome}! <br> Seja bem vindo!</h2>`);
  } else {
    res.send(`<h2>Faça o login para acessar o seu perfil.</h2>`);
  }
  });
*/
// ROTA DE VÍDEOS
app.get("/videos/:playlist?", (req, res) => {
  const listaPlaylists = ['Pop', 'Rock', 'Jazz', 'Hip-Hop'];
  const playlist = req.params.playlist; 
  res.render("videos", {
    playlist: playlist,
    listaPlaylists: listaPlaylists
  });
});

// ROTA DE PRODUTOS
app.get("/produtos/:produto?", (req, res) => {
  const listaProdutos = ['Computador', 'Celular', 'Tablet', 'Notebook']
  const produto = req.params.produto
  res.render("produtos", {
    // Enviando a variável para a página
    // Será chamado na página
    produto : produto, // Variável que está na index (req.params)
    listaProdutos : listaProdutos
    // Na pagina produtos.ejs haverá uma testagem de condição
  });
});

// Iniciando o servidor na porta 8080
app.listen(8080, (error) => {
  if (error) {
    console.log(`Ocorreu um erro: ${error}`);
  } else {
    console.log("Servidor iniciado com sucesso!");
  }
});
