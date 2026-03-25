require('dotenv').config()
const axios = require('axios')


const baseURL = 'https://api.openweathermap.org/data/2.5/forecast'

const q = 'Itu'

const appid = process.env.APPID

const units = 'metric'

const lang = 'pt_br'

const cnt = 3

const url = `${baseURL}?q=${q}&appid=${appid}&units=${units}&lang=${lang}&cnt=${cnt}`

const exercicioComAsyncAwait = () => {

}

// axios.get(url)
// .then(res => {
//   console.log(res)
//   console.log("--------------------")
//   return res.data
// })
// .then(res => {
//   console.log(res)
//   console.log("--------------------")
//   return res
// })
// .then(abc => {
//   console.log(abc.cnt)
//   console.log("--------------------")
//   return abc.list//complete aqui, não vale devolver o abc
// })
// //complete o then para exibir o objeto que se encontra na primeira posição do list
// .then(list => {
//   console.log(list[0])
//   console.log("--------------------")
//   return list //não vale devolver list[0]
// })
// //mais um then para exibir a temperatura maxima somente do primeiro
// .then(list => {
//   console.log(list[0].main.temp_max)
//     console.log("--------------------")
//   return list
// })
// //mais um then, iterando sobre a lsita de previsões (fazer um for..of)
// //para cada previsão, exibir a temperatura minima, temperatura maxima e descrição
// .then(previsoes => {
//   for(let previsao of previsoes){
//     console.log(`
//         Temp min: ${previsao.main.temp_min}. 
//         Temp max: ${previsao.main.temp_max}
//         Description: ${previsao.weather[0].description}
//     `)
//     console.log('++++++++++++++++++++')  
//   }
// })
