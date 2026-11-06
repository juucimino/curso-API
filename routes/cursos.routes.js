const express = require ("express")
const router = express.Router()
const db = require ("../db")

app.get("/", async (req, res) => {
    const [cursos] = await db.execute("select * from curso")
    return res.json(cursos)
})
app.post("/", async (req, res) => {
    const { nome, descricao, professorID} = req.body

    if(!nome || !descricao || !professorID){
        return res.status(400).json({error: "nome, descrição, professorID são obrigatorios"})
    }
    const[resultado] = await db.execute(
        "insert into curso (nome, descricao, professor_id) values (?, ?, ?)",
        [nome, descricao, professorID]
    )
    return res.status(201).json({id: resultado.insertID, nome, descricao})
})
app.delete("/cursos/:id", async (req, res) => {
    const id =req.params.id //pega id da url
    const [resultado] = await db.execute(
        "delete from curso where id = ?",
        [id]
    )
    if(resultado.affectedRows === 0){
        return res.status(404).json({error: "curso não encontrado!"})
    }
    return res.status(204).end()
})