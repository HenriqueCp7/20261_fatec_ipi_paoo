const axios = require('axios')

const baseURL = 'https://api.openweathermap.org/data/2.5/forecast'

const q = 'Itu'

const appid = 'ef0b0973b783e0614ac87612ec04344b'

const units = 'metric'

const lang = 'pt_br'

const cnt = 3

const url = `${baseURL}?q=${q}&appid=${appid}&units=${units}&lang=${lang}&cnt=${cnt}`

axios.get(url)
.then(res => {
  console.log(res)
  console.log("--------------------")
  return res.data
})
.then(res => {
  console.log(res)
  console.log("--------------------")
  return res
})
.then(abc => {
  console.log(abc.cnt)
  console.log("--------------------")
  return abc.list//complete aqui, não vale devolver o abc
})
//complete o then para exibir o objeto que se encontra na primeira posição do list
.then(list => {
  console.log(list[0])
  console.log("--------------------")
  return list //não vale devolver list[0]
})
//mais um then para exibir a temperatura maxima somente do primeiro
.then(list => {
  console.log(list[0].main.temp_max)
    console.log("--------------------")

})