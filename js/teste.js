const criarPowestats = (data) => {

  
    const barraTotal = document.createElement('div')
    barraTotal.classList.add('barra-total')

    const barraValor = document.createElement('div')
    barraValor.classList.add('barra-valor')
    barraValor.style.width = `${data.powerstats}%`

    const porcentagem = document.createElement('div')
    porcentagem.textContent = `${data.powerstats}%`


    barraTotal.append(barraValor)
    barraValor.append(porcentagem)

    return barraTotal
}


const carregarPowerstats = async () => {

    let idHeroi = localStorage.getItem('id')

    const url =  `https://superheroapi.com/api.php/2191539877713290/${idHeroi}/powerstats`

    const response = await fetch (url)

    const data = await response.json()

    console.log(data);
    
    const novoPowertats = document.getElementById('status')
    const heroiPowerstats = data.map(criarPowestats)

    novoPowertats.replaceChildren(...heroiPowerstats)
}