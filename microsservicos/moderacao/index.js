const axios = require('axios')
const express = require('express')
const app = express()
app.use(express.json())

const blacklist = ['avenida', 'gato', 'pastel', 'uva', 'fruta']

const informacoes = {
  avenida: 0,
  gato: 0,
  pastel: 0,
  uva: 0,
  fruta: 0,
  lembretesBloqueados: 0,
  palavrasEmLembretes: 0,
  observacoesBloqueadas: 0,
  palavrasEmObservacoes: 0
}

const funcoes = {
  palavraProibida: (texto) => {
    return blacklist.some(palavra => texto.includes(palavra))
  },

  registrarInformacoes: (texto, tipo) => {
    const encontradas = blacklist.filter(palavra => texto.includes(palavra))
    encontradas.forEach(palavra => informacoes[palavra]++)

    const quantidade = encontradas.length
    if (tipo === 'lembrete') {
      informacoes.lembretesBloqueados++
      informacoes.palavrasEmLembretes += quantidade
    }
    if (tipo === 'observacao') {
      informacoes.observacoesBloqueadas++
      informacoes.palavrasEmObservacoes += quantidade
    }
  }
}

app.post('/lembretes', async (req, res) => {
  const {texto} = req.body

  if (funcoes.palavraProibida(texto)) {
    funcoes.registrarInformacoes(texto, 'lembrete')
    return res.status(400).end()
  }
  await axios.post('http://localhost:10000/eventos', {
    tipo: 'LembretePermitido',
    dados: { texto }
  })
  res.status(201).end()
})

app.post('/lembretes/:id/observacoes', async (req, res) => {
  const {texto} = req.body
  if (funcoes.palavraProibida(texto)) {
    funcoes.registrarInformacoes(texto, 'observacao')
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
  let mediaLembretes = 0
  let mediaObservacao = 0

  if (informacoes.lembretesBloqueados !== 0) {
    mediaLembretes = informacoes.palavrasEmLembretes / informacoes.lembretesBloqueados
  }

  if (informacoes.observacoesBloqueadas !== 0) {
    mediaObservacao = informacoes.palavrasEmObservacoes / informacoes.observacoesBloqueadas
  }  res.json({
    [`Informacoes sobre a palavra: ${palavra}`]: 
    {
      qntDeVezesDetectada: informacoes[palavra] || 0,
      mediaDeVezesEmLembretes: mediaLembretes,
      mediaDeVezesEmObservacao: mediaObservacao
    }
  })
})

const port = 9000
app.listen(port, () => {
  console.log(`Moderação. Porta ${port}.`)

  function pingModeracao() {
      axios.post('http://localhost:10000/eventos', { 
        tipo: 'ModeracaoOperante', 
        dados: {} 
      })
      setTimeout(pingModeracao, 60000)
    }
    pingModeracao()
})