import express from "express";
import bodyParser from "body-parser";
import connection from "./config/sequelize-config.js";
import Cliente from "./models/Cliente.js";

const app = express();

// Permite receber dados vindo de formulários
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Realizando a conexão com o banco de dados
connection.authenticate().then(() => {
  console.log("Conexão com o banco de dados feita com sucesso!");
  Cliente.sync({ force: false })
    .then(() => {
      console.log("Tabela 'clientes' sincronizada com sucesso!");
    })
    .catch((error) => {
      console.error("Erro ao sincronizar a tabela 'clientes':", error);
    });
}).catch((error) => {
  console.log(error);
});

// Definindo o EJS como renderizador de páginas
app.set("view engine", "ejs");

// Definir a pasta dos arquivos estáticos (public)
app.use(express.static('public'));

// CRIANDO A ROTA PRINCIPAL
app.get("/", (req, res) => {
  res.render("index");
});

// Criando o banco de dados se ele não existir
connection.query(`CREATE DATABASE IF NOT EXISTS loja;`).then(() => {
  console.log("O banco de dados está criado.");
}).catch((error) => {
  console.log(error);
});

// ROTA DE PRODUTOS
app.get("/produtos", (req, res) => {
  const produtos = [
    { nome: 'Melonpan', preco: 10.00, categoria: 'Pães Doces', imagem: 'melonpan' },
    { nome: 'Anpan', preco: 8.00, categoria: 'Pães Doces', imagem: 'anpan' },
    { nome: 'Karepan', preco: 15.00, categoria: 'Pães Salgados', imagem: 'karepan' },
    { nome: 'Shokupan', preco: 10.50, categoria: 'Pães', imagem: 'shokupan' },
    { nome: 'Matcha Swiss Roll', preco: 12.00, categoria: 'Bolos', imagem: 'matcha_swiss_roll' },
    { nome: 'Castella Cake', preco: 8.00, categoria: 'Bolos', imagem: 'castella_cake' }
  ];
  res.render("produtos", { produtos: produtos });
});

// ROTA DINÂMICA PARA CADA PRODUTO
app.get("/produtos/:nome", (req, res) => {
  const produtos = [
    { nome: 'Melonpan', preco: 10.00, categoria: 'Pães Doces', imagem: 'melonpan' },
    { nome: 'Anpan', preco: 8.00, categoria: 'Pães Doces', imagem: 'anpan' },
    { nome: 'Karepan', preco: 15.00, categoria: 'Pães Salgados', imagem: 'karepan' },
    { nome: 'Shokupan', preco: 10.50, categoria: 'Pães', imagem: 'shokupan' },
    { nome: 'Matcha Swiss Roll', preco: 12.00, categoria: 'Bolos', imagem: 'matcha_swiss_roll' },
    { nome: 'Castella Cake', preco: 8.00, categoria: 'Bolos', imagem: 'castella_cake' }
  ];
  const produto = produtos.find(p => p.nome === req.params.nome);
  if (produto) {
    res.render("produto", { produto: produto });
  } else {
    res.status(404).send("Produto não encontrado");
  }
});

// ROTA CLIENTES
app.get("/clientes", (req, res) => {
  Cliente.findAll().then(clientes => {
    res.render("clientes", { clientes: clientes });
  }).catch(error => {
    console.error("Erro ao buscar clientes:", error);
    res.status(500).send("Erro ao buscar clientes");
  });
});

// POST ROTA PARA CADASTRAR CLIENTES
app.post("/clientes/new", (req, res) => {
  const { nome, cpf, endereco } = req.body;
  Cliente.create({
    nome: nome,
    cpf: cpf,
    endereco: endereco
  }).then(() => {
    res.redirect("/clientes");
  }).catch((error) => {
    console.error("Erro ao criar cliente:", error);
    res.status(500).send("Erro ao criar cliente");
  });
});

// ROTA DE EXCLUSÃO DE CLIENTES
app.get("/clientes/delete/:id", (req, res) => {
  const id = req.params.id;
  Cliente.destroy({
    where: { id: id }
  }).then(() => {
    res.redirect("/clientes");
  }).catch(error => {
    console.error("Erro ao excluir cliente:", error);
    res.status(500).send("Erro ao excluir cliente");
  });
});
// ROTA PEDIDOS
app.get("/pedidos", (req, res) => {
  const pedidos = [
    { numero: 1, descricao: 'Combo 1: Melonpan e Anpan', valor: 16.20 },
    { numero: 2, descricao: 'Combo 2: Karepan e Shokupan', valor: 22.95 },
    { numero: 3, descricao: 'Combo 3: Matcha Swiss Roll e Castella Cake', valor: 18.00 },
    { numero: 4, descricao: 'Combo 4: Melonpan, Anpan e Karepan', valor: 29.70 }
  ];
  res.render("pedidos", { pedidos: pedidos });
});
// ROTA PARA EDITAR CLIENTE
app.get("/clientes/edit/:id", (req, res) => {
  const id = req.params.id;
  Cliente.findByPk(id).then(cliente => {
    if (cliente) {
      res.render("clienteEdit", { cliente: cliente });
    } else {
      res.status(404).send("Cliente não encontrado");
    }
  }).catch(error => {
    console.error("Erro ao buscar cliente:", error);
    res.status(500).send("Erro ao buscar cliente");
  });
});
// POST ROTA PARA ATUALIZAR CLIENTES
app.post("/clientes/update/:id", (req, res) => {
  const id = req.params.id;
  const { nome, cpf, endereco } = req.body;
  Cliente.update({
    nome: nome,
    cpf: cpf,
    endereco: endereco
  }, {
    where: { id: id }
  }).then(() => {
    res.redirect("/clientes");
  }).catch((error) => {
    console.error("Erro ao atualizar cliente:", error);
    res.status(500).send("Erro ao atualizar cliente");
  });
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
