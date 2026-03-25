//5 * 4 * 3 * 2 * 1
const fatorial = n => {
  if(n < 0)
    return Promise.reject('Valor não pode ser negativo')
  let res = 1
  for(let i = 2; i <= n; i++){
    res = res * i
  }
  return Promise.resolve(res)
}

//uma função para chamar com then/catch
function chamadaComThenCatch(){
  fatorial(5)
  .then((res) => console.log(`Resultado: ${res}`))
  .catch((erro) => console.log(`Erro: ${erro}`))

  fatorial(-5)
  .then((res) => console.log(`Resultado: ${res}`))
  .catch(erro => console.log(`Erro: ${erro}`))
}
//uma função para chamar com async/await
const chamadaComAsyncAwait = async () => {

  try{
    const f2 = await fatorial(-5)
    console.log(f2)
  }
  catch(erro){
    console.log(`Erro: ${erro}`)
  }
  try{
    const f1 = await fatorial(5)
    console.log(f1)
  }
  catch(erro){
    console.log(`Erro: ${erro}`)
  }
}
chamadaComAsyncAwait()


//chamadaComThenCatch()

// async function hello(nome){
//   return `Oi, ${nome}`
// }

// const umaPromise = hello('Ana')
// umaPromise.then((texto => console.log(`${texto}`)))