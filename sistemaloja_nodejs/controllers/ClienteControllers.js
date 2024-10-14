// Importando os Models
import Cliente from "../models/Cliente.js"
import express from "express"
const router = express.Router()
// ROTA CLIENTES
router.get("/clientes", function(req, res){
Cliente.findAll().then(clientes => {
res.render("clientes", {
clientes: clientes
})
})
})
export default router //exportando o módulo

// ROTA DE CADASTRO DE CLIENTES
router.post("/clientes/new", (req, res) => {
    const nome = req.body.nome
    const cpf = req.body.cpf
    const endereco = req.body.endereco
    Cliente.create({
    nome : nome,
    cpf : cpf,
    endereco : endereco
}).then(() => {
    res.redirect("/clientes");
}).catch((error) => {
    console.error("Erro ao criar cliente:", error);
    res.status(500).send("Erro ao criar cliente");
});
});

// ROTA DE EXCLUSÃO DE CLIENTES
router.get("/clientes/delete/:id", (req, res) => {
    const id = req.params.id
    Cliente.destroy({
    where: {
    id : id
    }
    }).then(() => {
    res.redirect("/clientes")
    })
    })
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
  
    