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
app.get("/perfil", (req, res) => {
  res.render("perfil");
});

// ROTA DE VÍDEOS
app.get("/videos", (req, res) => {
  res.render("videos");
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
