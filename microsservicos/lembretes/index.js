const axios = require('axios')
const express = require('express')
const app = express()
app.use(express.json()) //função middleware
const lembretes = {}
let id = 0

const funcoes = {
  LembretePermitido: async (dados) => {
    id++
    const texto = dados.texto
    lembretes[id] = {id, texto}
    await axios.post('http://localhost:10000/eventos', {
      tipo: 'LembreteCriado',
      dados: {id, texto}
    })
  }
}

app.get('/lembretes', (req, res) => {
  res.json(lembretes)
})

app.post('/eventos', async (req, res) => {
  try{
    const evento = req.body
    console.log(evento)
    await funcoes[evento.tipo](evento.dados)
  }
  catch(e){}
  res.end()
})

const port = 4000
app.listen(port, () => {
  console.log(`Lembretes. Porta ${port}.`)
  
  function pingLembretes() {
    axios.post('http://localhost:10000/eventos', { 
      tipo: 'LembretesOperante', 
      dados: {} 
    })
    setTimeout(pingLembretes, 60000)
  }
  pingLembretes()
})