const express = require("express")
const router = express.Router()
const db = require("../db")

app.get("/s", async (req, res) => {
    const [professores] = await db.execute("select * from professor")
    return res.json(professores)
})



app.post("/", async (req, res) => {
    const { nome, especialidade } = req.body
    if(!nome || !especialidade){
        return res.status(400).json({error: "nome e especialidades são obrigatorios"})
    }
    if(nome.length < 3) {
        return res.status(400).json({ error: "nome precisa ter mais de 3 caracteres"})
    }
    const [resultado] = await db.execute(
        "insert into professor(nome,especialidade) values (?, ?)",
        [nome, especialidade]
    )
    return res.status(201).json({id: resultado.insertID, nome, especialidade})
})
module.exports = router