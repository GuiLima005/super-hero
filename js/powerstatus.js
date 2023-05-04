'use strict'

/*Chave da API Super Hero
    2191539877713290*/

const seachForm = document.querySelector('.busca')
const seachList = document.getElementById('lista-busca')

const getInputValor = async (event) => {
    event.preventDefault()
    let buscaTexto = await seachForm.seach.value
    fetchAllSuperHero(buscaTexto)
    console.log(buscaTexto);
}

seachForm.addEventListener('submit', getInputValor)

const fetchAllSuperHero = async (buscaTexto) => {
    let url = `https://superheroapi.com/api.php/2191539877713290/search/${buscaTexto}`

    const response = await fetch(url)
    let data = await response.json()

    console.log(data);
}









// const criarPowerstatus = () => {
//     const div = document.createElement('div')
//     div.classList.add('status')

//     const p = document.createElement('p')

//     const barraTotal = document.createElement('div')
//     barraTotal.classList.add('barra-total')

//     const barraValor = document.createElement('div')
//     barraValor.classList.add('barra-valor')

//     const porcentagem = document.createElement('div')
//     porcentagem.classList.add('porcentagem')

//     div.append(p, barraTotal)
//     barraTotal.append(barraValor)
//     barraValor.append(porcentagem)

//     return div
// }



