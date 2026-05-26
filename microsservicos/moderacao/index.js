const axios = require('axios')
const express = require('express')
const app = express()
app.use(express.json())

const blacklist = ['avenida', 'gato', 'pastel', 'uva', 'fruta']
const informacoes = {
  qntDetectadas: {},
  lembretesBloqueados: 0,
  palavrasEmLembretes: 0,
  observacoesBloqueadas: 0,
  palavrasEmObservacoes: 0
}

function palavraProibida(texto) {
  return blacklist.some(palavra => texto.includes(palavra))
}

function registrarInformacoes(texto, tipo) {
  const encontradas = blacklist.filter(palavra => texto.includes(palavra))
  encontradas.forEach(palavra => {
    informacoes.qntDetectadas[palavra] = (informacoes.qntDetectadas[palavra] || 0) + 1
  })
  const quantidade = encontradas.reduce((x, vet) => x + 1, 0)
  if (tipo === 'lembrete') {
    informacoes.lembretesBloqueados++
    informacoes.palavrasEmLembretes += quantidade
  } else {
    informacoes.observacoesBloqueadas++
    informacoes.palavrasEmObservacoes += quantidade
  }
}

app.post('/lembretes', async (req, res) => {
  const { texto } = req.body
  if (palavraProibida(texto)) {
    registrarInformacoes(texto, 'lembrete')
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
    registrarInformacoes(texto, 'lembrete')
    return res.status(400).end()
  }
  await axios.post('http://localhost:10000/eventos', {
    tipo: 'ObservacaoPermitida',
    dados: { texto, lembreteId: req.params.id }
  })
  res.status(201).end()
})

app.get('/informacoes/:palavra', (req, res) => {
  const palavra = req.params.palavra
  res.json({
    [`Informacoes sobre a palavra: ${palavra}`]: 
    {
      qntDeVezesDetectada: informacoes.qntDetectadas[palavra] || 0,
      mediaDeVezesEmLembretes: informacoes.lembretesBloqueados === 0 ? 0
        : informacoes.palavrasEmLembretes / informacoes.lembretesBloqueados,
      mediaDeVezesEmObservacao: informacoes.observacoesBloqueadas === 0 ? 0
        : informacoes.palavrasEmObservacoes / informacoes.observacoesBloqueadas
    }
  })
})

const port = 9000
app.listen(port, () => {
  console.log(`Moderação. Porta ${port}.`)
})