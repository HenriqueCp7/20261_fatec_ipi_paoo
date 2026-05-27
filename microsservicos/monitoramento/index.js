const axios = require('axios')
const express = require('express')
const app = express()
app.use(express.json())

const status = {
    barramento: 'Operante',
    lembretes: 'Inoperante',
    observacoes: 'Inoperante',
    classificacao: 'Inoperante',
    consulta: 'Inoperante',
    moderacao: 'Inoperante'
}

const funcoes = {
  LembreteCriado: () => {
    status['lembretes'] = 'Operante'
  },
  ObservacaoCriada: () => {
    status['observacoes'] = 'Operante'
  },
  ObservacaoAtualizada: () => {
    status['observacoes'] = 'Operante'
  },
  ObservacaoClassificada: () => {
    status['classificacao'] = 'Operante'
  },
  LembretesOperante: () => { 
    status['lembretes'] = 'Operante' 
  },
  ObservacoesOperante: () => { 
    status['observacoes'] = 'Operante' 
  },
  ClassificacaoOperante: () => { 
    status['classificacao'] = 'Operante' 
  },
  ConsultaOperante: () => { 
    status['consulta'] = 'Operante' 
  },
  ModeracaoOperante: () => {
    status['moderacao'] = 'Operante'
  }
}

function resetaStatus() {
  status['lembretes'] = 'Inoperante'
  status['observacoes'] = 'Inoperante'
  status['classificacao'] = 'Inoperante'
  status['consulta'] = 'Inoperante'
  status['moderacao'] = 'Inoperante'
  setTimeout(resetaStatus, 120000)
}
setTimeout(resetaStatus, 120000)

app.get('/status', (req, res) => {
  res.json(status)
})

app.post('/eventos', (req, res) => {
  try {
    const evento = req.body
    console.log(evento)
    funcoes[evento.tipo](evento.dados)
  }
  catch (e) {}
  res.end()
})

const port = 8000
app.listen(port, async () => {
    console.log(`Monitoramento. Porta ${port}.`)
    const resp = await axios.get('http://localhost:10000/eventos')
    resp.data.forEach((evento) => {
        try{ 
            funcoes[evento.tipo](evento.dados) 
        } 
        catch(e){}
    })
})
