// //closure
function eAgora(){
    let cont = 1
    function f1(){
        console.log(cont)
    }
    cont++
    function f2(){
        console.log(cont)
    }
    cont++
    return {f1, f2}
}
let res = eAgora()
res.f1()
res.f2()
// function saudacoesFactory(saudacao, nome){
//     let outra
//     return function(){
//         console.log(`${saudacao}, ${nome}`)
//     }
// }
// let olaJoao = saudacoesFactory('Oi', 'João')
// let tchauJoao = saudacoesFactory('Tchau', 'João')
// olaJoao()
// tchauJoao()
// function f(){
//     let nome = 'João'
//     function g(){
//         console.log(nome)
//     }
//     g()
// }
// f()
// let umaFuncao = function(){
//     console.log("Fui armazenada numa variável")
// }
// umaFuncao()

// function f (funcao){
//     funcao()
// }

// f(umaFuncao)

// function g(){
//     function outraFuncao(){
//         console.log('Fui criada pela g')
//         return () => console.log ("E agora?")
//     }
//     return outraFuncao
// }


// f(g()()())

// f(g())

// const gResult = g()
// gResult()
// g()()


// const valores = [1, 2, 3, 4]
// const soma = valores.reduce((ac, v) =>{return ac + v})
// console.log(soma)
// // const nomes = ['Ana Maria', 'Antonio', 'Rodrigo', 'Alex', 'Cristina']
// const algumComecaComA = nomes.some(n => n.startsWith('A'))
// console.log(algumComecaComA)
// const todosComecamComA = nomes.every(n => n.startsWith('A'))
// console.log(todosComecamComA)
//[A, A, R, A, C]
// const res = nomes.map(nome => nome.charAt(0))
// console.log(res)
//reescrever a linha 3 usando todo syntax sugar que as arrow functions oferecem
// const apenasComA = nomes.filter(n => n.startsWith('A'))
// console.log(apenasComA)


//funções
// //arrow function
// const dobrar = n => 2 * n
// console.log(dobrar(6))
// const triplicar = (n) => {
//     console.log("Vamos calcular o triplo de " + n)
//     return 3 * n
// }
// console.log(triplicar(5))
//escreva uma função que decida se um valor é par ou não

// const hello = nome => console.log('Oi, ' + nome)
// hello('Ana')
// const hello = () => {console.log('Oi')}
// hello()
// const dobrar = function(n){
//     return 2 * n
// }
// console.log(dobrar(2))
// console.log(dobrar(undefined))

// const triplicar = function(n = 5){
//     return 3 * n
// }
// const resultado = triplicar(10)
// console.log(resultado)
// console.log(triplicar(undefined))

// const produto = function(a, b){
//     console.log(a * b)
// }
// produto(4, 3)
// function somar(a, b){
//     return a + b
// }
// console.log(somar(2, 3))

//functions e arrow functions
// function hello(){
//     console.log('Oi')
// }
// hello(undefined)
// function hello(nome){
//     console.log('Oi, ' + nome)
// }
// hello('Ana')
// v1 = []
// console.log(v1.length)
// v1[0] = 3.4
// console.log(v1.length)
// v1[10] = 'abc'
// console.log(v1.length)
// console.log(v1)
// for(let i = 0; i < v1.length; i++){
//     console.log(v1[i])
// }
//comparação por igualdade
//Java: ==, Python: ==
//Javascript: == ou ===(usamos apenas esse)
//null e undefined
//exemplos:
//a = null
//b = undefined
// lista = []
// lista2 = lista
// console.log(lista2 === lista)
// console.log([] == [])
// console.log(false == [])
// console.log(null == undefined): true
// console.log(null == null): true
// console.log(1 === [1]): false
//console.log(1 == [1]): true
// console.log(true == 1): true
// console.log(1 === '1'): false
// console.log(1 == '1'): true
// console.log(1 === 1): true
// console.log(1 == 1): true

//coerção explícita
// const n1 = 2
// const n2 = '3'
// const n3 = n1 + Number(n2)
// console.log(`${n1} + ${n2} = ${n3}`)


//coerção implicita
// const n1 = 2
// const n2 = '3'
// const n3 = n1 + n2
// console.log(`${n1} + ${n2} = ${n3}`)

//tipos
//js é dinamicamente tipa

// let a = 2
// console.log(typeof(a))
// a = true
// console.log(typeof(a))

// s  = "abc"
// String s = "abc";

// listaDeLista = [[], [], [], 2]

// List <List <String>> lista = new ArrayList <List<String>>();
//declaração de variáveis
//const, let e var
//içamento(hoisting)
//null undefined
// var idade = 18
// console.log(`Oi, ${nome}.`)
// if(idade >= 18){
//   let nome = 'Maria'
//   console.log(`Parabéns, ${nome}. Você pode dirigir.`)
// }
// console.log("Até mais, " + nome + '.')
// String linguagem = "Javascript";
// String linguagem = "Java";
// var linguagem = 'Javascript'
// console.log(`Aprendendo ${linguagem}`)
// var linguagem = 'Java'
// console.log('Aprendendo ' + linguagem)
// console.log('Antes do for')
// for (const i = 0; i < 10; i = i + 1){
//   console.log('for com const...')
// }
// console.log('Depois do for')

// let nome = 'Maria'
// console.log(nome)
// nome = `Meu nome é ${nome}.`
// console.log(nome)

// const nome = 'José'
// console.log(nome)
// nome = 'José Silva'
// console.log(nome)

// console.log('Hello, JS!')