const axios = require('axios')
const express = require('express')
const app = express()
app.use(express.json()) //função middleware
const lembretes = {}
let id = 0
app.get('/lembretes', (req, res) => {
  res.json(lembretes)
})

/*
{
  1: {
    id: 1,
    texto: 'fazer café'
  },
  2: {
    id: 2,
    texto: 'natação'
  }
}
*/
app.post('/lembretes', async (req, res) => {
  id++
  const texto = req.body.texto
  lembretes[id] = {id, texto}
  await axios.post('http://localhost:10000/eventos', {
    tipo: 'LembreteCriado',
    dados: {id, texto}
  })
  res.json(lembretes[id])
})

//fazer um endpoint para receber eventos
//ele apenas exibe num console.log o evento recebido
//e termina
app.post('/eventos', (req, res) => {
  const evento = req.body
  console.log(evento)
  res.end()
})

const port = 4000
app.listen(port, () => {
  console.log(`Lembretes. Porta ${port}.`)
})