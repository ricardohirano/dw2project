// Importando o Express na aplicação
const express = require("express"); //CommonJS Modules
// Criando uma instância do Express
const app = express();

// Definindo o EJS como renderizador de páginas
app.set("view engine", "ejs");

// Definir a pasta dos arquivos estáticos (public)
app.use(express.static('public'))

// CRIANDO A ROTA PRINCIPAL
app.get("/", (req, res) => {
  // Será renderizada a página index.ejs que está na pasta 'views'
  res.render("index");
});

// ROTA DE PRODUTOS
app.get("/produtos/:produto?", (req, res) => {
  const listaProdutos = ["Pão Francês", "Bolo de Chocolate", "Croissant", "Torta de Maçã"];
  const produto = req.params.produto;
  res.render("produtos", {
    // Enviando a variável para a página
    // Será chamado na página
    produto: produto, // Variável que está na index (req.params)
    listaProdutos: listaProdutos,
    // Na pagina produtos.ejs haverá uma testagem de condição
  });
});

// ROTA CLIENTES
app.get("/clientes", (req, res) => {
  const clientes = [
    { nome: "João Silva", cpf: "123.456.789-00", endereco: "Rua A, 123" },
    { nome: "Maria Souza", cpf: "987.654.321-00", endereco: "Rua B, 456" },
    { nome: "Carlos Pereira", cpf: "456.789.123-00", endereco: "Rua C, 789" },
    { nome: "Ana Oliveira", cpf: "321.654.987-00", endereco: "Rua D, 101" }
  ];
  res.render("clientes", { clientes: clientes });
});

// ROTA DE PRODUTOS
app.get("/produtos", (req, res) => {
  const produtos = [
    { nome: "Pão Francês", preco: 1.00, categoria: "Pães" },
    { nome: "Bolo de Chocolate", preco: 20.00, categoria: "Bolos" },
    { nome: "Croissant", preco: 5.00, categoria: "Salgados" },
    { nome: "Torta de Maçã", preco: 15.00, categoria: "Doces" }
  ];
  res.render("produtos", { produtos: produtos });
});

// ROTA PEDIDOS
app.get("/pedidos", (req, res) => {
  const pedidos = [
    { numero: 1, valor: 30.00 },
    { numero: 2, valor: 50.00 },
    { numero: 3, valor: 20.00 },
    { numero: 4, valor: 40.00 }
  ];
  res.render("pedidos", { pedidos: pedidos });
});

// Iniciando o servidor na porta 8080
const port = 8080;
app.listen(port, (error) => {
  if (error) {
    console.log(`Ocorreu um erro: ${error}`);
  } else {
    console.log(`Servidor iniciado com sucesso em: http://localhost:${port}`);
  }
});
