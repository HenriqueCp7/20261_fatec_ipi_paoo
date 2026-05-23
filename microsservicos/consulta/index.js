const axios = require('axios')
const express = require('express')
const app = express()
//middleware
app.use(express.json())

const baseConsolidada = {}

//mapa de funções
//para cada tipo de evento possível, uma função associada
/*
  {
    1: {
      id: 1,
      texto: 'Fazer café',
      observacoes: [
        {
          id: 10001,
          texto: 'agora',
          lembreteId: 1
        },
        {
          id: 10002,
          texto: 'sem açúcar',
          lembreteId: 1
        }
      ]
    }
  }
*/
const funcoes = {
  LembreteCriado: (lembrete) => {
    //faça essa implementação
    baseConsolidada[lembrete.id] = lembrete
  },
  ObservacaoCriada: (observacao) => {
    const observacoes = baseConsolidada[observacao.lembreteId]['observacoes'] || []
    observacoes.push(observacao)
    baseConsolidada[observacao.lembreteId]['observacoes'] = observacoes
  },
  ObservacaoAtualizada: (observacao) => {
    const observacoes = baseConsolidada[observacao.lembreteId]["observacoes"]
    const indice = observacoes.findIndex((o) => o.id === observacao.id)
    observacoes[indice] = observacao
  }
}

app.get('/lembretes', (req, res) => {
  res.json(baseConsolidada)
})


app.post('/eventos', async (req, res) => {
  try{
    const evento = req.body
    console.log(evento)
    funcoes[evento.tipo](evento.dados)
  }
  catch(e){}
  res.end()
})

const port = 6000
app.listen(port, async () => {
  console.log(`Consulta. Porta ${port}.`)
  const resp = await axios.get('http://localhost:10000/eventos')
  resp.data.forEach((evento, indice, colecao) => {
    try{
      funcoes[evento.tipo](evento.dados)
    } 
    catch(e){}
  })

  function pingConsulta() {
          axios.post('http://localhost:10000/eventos', { 
            tipo: 'ConsultaOperante', 
            dados: {} 
          })
          setTimeout(pingConsulta, 30000)
        }
        pingConsulta()
})