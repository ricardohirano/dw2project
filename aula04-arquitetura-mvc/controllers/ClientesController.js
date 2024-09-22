import express from 'express' // es6 modules
const router = express.Router();

// ROTA DE CLIENTES
router.get("/clientes", (req, res) =>{
    const clientes = [
        {nome: "Ana Silva", cpf: "132.456.789-00", endereco: "Rua das flores, 123 - Bairro Jardim Primavera - Feliciadade -SP"},
        {nome: "Ana Silva", cpf: "132.456.789-00", endereco: "Rua das flores, 123 - Bairro Jardim Primavera - Feliciadade -SP"},
        {nome: "Ana Silva", cpf: "132.456.789-00", endereco: "Rua das flores, 123 - Bairro Jardim Primavera - Feliciadade -SP"},
        {nome: "Ana Silva", cpf: "132.456.789-00", endereco: "Rua das flores, 123 - Bairro Jardim Primavera - Feliciadade -SP"},
        
    ]
    res.render("clientes",{
        clientes : cliente
    });
});
export default router