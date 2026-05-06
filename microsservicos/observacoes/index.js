const axios = require('axios')
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const app = express()
//função middleware
app.use(express.json())
const observacoesPorLembrete = {}
/*
  {
    1: [
      {
        id: 10000,
        texto: 'comprar café',
        idLembrete: 1
      },
      {id: ..., texto: ..., idLembrete: ...}
    ],
    2: []
  }
*/
//post
// /lembretes/1233/observacoes
app.post('/lembretes/:id/observacoes', async (req, res) => {
  const idObs = uuidv4()
  const { texto } = req.body
  const observacoesDoLembrete = observacoesPorLembrete[req.params.id] || []
  observacoesDoLembrete.push({id: idObs, texto})
  observacoesPorLembrete[req.params.id] = observacoesDoLembrete
  //emitir um evento do tipo ObservacaoCriada
  await axios.post('http://localhost:10000/eventos', {
    tipo: 'ObservacaoCriada',
    dados: {
      id: idObs, texto, lembreteId: req.params.id
    }
  })
  res.status(201).json(observacoesDoLembrete)

})

//fazer o endpoint get
app.get('/lembretes/:id/observacoes', (req, res) => {
  //devolver a lista de observações do lembrete cujo id se encontra na path
  //ou uma lista vazia
  res.json(observacoesPorLembrete[req.params.id] || [])
})

app.post('/eventos', (req, res) => {
  const evento = req.body
  console.log(evento)
  res.end()
})

//subir esse mss na porta 5000
const port = 5000
app.listen(port, () => {
  console.log(`Observações. Porta ${port}.`)
})
