const axios = require('axios')
const express = require('express')
const app = express()
app.use(express.json())

const blacklist = ['avenida', 'gato', 'pastel', 'uva', 'fruta']

function palavraProibida(texto) {
  return blacklist.some(palavra => texto.includes(palavra))
}

app.post('/lembretes', async (req, res) => {
  const { texto } = req.body
  if (palavraProibida(texto)) {
    return res.status(400).end()
  }
  await axios.post('http://localhost:10000/eventos', {
    tipo: 'LembretePermitido',
    dados: { texto }
  })
  res.status(201).end()
})

app.post('/lembretes/:id/observacoes', async (req, res) => {
  const { texto } = req.body
  if (palavraProibida(texto)) {
    return res.status(400).end()
  }
  await axios.post('http://localhost:10000/eventos', {
    tipo: 'ObservacaoPermitida',
    dados: { texto, lembreteId: req.params.id }
  })
  res.status(201).end()
})

const port = 9000
app.listen(port, () => {
  console.log(`Moderação. Porta ${port}.`)
})