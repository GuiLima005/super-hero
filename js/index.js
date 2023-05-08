'use strict'

/*Chave da API Super Hero
    2191539877713290*/

// Variavel para recuperar informações de entrada do usuário 
const searchForm = document.querySelector('.busca')

// Varaivel que vai localizar o ID que exibe 
// a imagem e o nome do super-herói na caixa do input
const searchList = document.getElementById('lista-busca')

let allData;

// Função para pegar o valor(escrita) no input
const getInputValor = async (event) => {

    event.preventDefault()

    let buscaTexto = await searchForm.seach.value

    fetchAllSuperHero(buscaTexto)

    console.log(buscaTexto)
}

// Função de click para recuperar o que ta escrito no input
searchForm.addEventListener('submit', getInputValor)

// Função que retorna o JSON dos personagens pela busca do input
const fetchAllSuperHero = async (buscaTexto) => {

    let token = '2191539877713290'
    let url = `https://superheroapi.com/api.php/${token}/search/${buscaTexto}`

    try {
        const response = await fetch(url)

        allData = await response.json()

        if (allData.response == 'success') {
            showSearchList(allData.results)
        }
    } catch (error) {
        console.log(error)
    }

}

// Função que cria e exibe a imagem e o nome do super-herói na caixa do input
const showSearchList = (data) => {

    searchList.innerHTML = ""
    console.log(data);
    

    data.forEach(dataItem => {
        const divElem = document.createElement('div')
        divElem.classList.add('lista-busca-item')


        divElem.innerHTML = `
            <img src="${dataItem.image.url ? dataItem.image.url : ""}" alt="">
            <p data-id = "${dataItem.id}">${dataItem.name}</p>
        `
        searchList.appendChild(divElem)
        // console.log(dataItem);

    });
}

// Função para buscar informações sobre o super-herói pesquisado e 
// exibir a lista de resultados. Caso contrário, a lista de resultados é limpa.
searchForm.seach.addEventListener('keyup', () => {

    if (searchForm.seach.value.length > 1) {
        fetchAllSuperHero(searchForm.seach.value)
    } else {
        searchList.innerHTML = ""
    }
})

// Função para quando o usuário clica em um item, 
// o código recupera o ID do super-herói
searchList.addEventListener('click', (event) => {

    let searchId = event.target.dataset.id

    let singleData = allData.results.filter(singleData => {

        // localStorage.setItem('id', searchId)

        return searchId === singleData.id;

    })

    showSuperheroDetails(singleData[0])

    // carregarPowerstats()

    searchList.innerHTML = ""

    // console.log(searchId)
})

// Função para exibir as informações na tela.
const showSuperheroDetails = (data) => {

    // console.log(data)

    document.querySelector('.personagem').innerHTML = `
        <img class = "heroi" src = "${data.image.url}">
    `

    document.querySelector('#nome').textContent = data.name


    /**************        POWERSTATS      ***************/
    let powerstats = document.querySelector('#informacoes')

    /**************        BIOGRAFIA      ***************/
    let biografia = document.querySelector('#biografia')

    /**************        CONEXÕES      ***************/
    let conexoes = document.querySelector('#conexoes')

    // IF para localizar o ID da div(existe no html)

    if (powerstats) {

        powerstats.innerHTML = `

        <div class="status">
            <p>intelligence:</p>
            <div class="barra-total">
                <div class="barra-valor" style="width:${data.powerstats.intelligence}%">
                
                    <div class="porcentagem">${data.powerstats.intelligence}%</div>
                </div>
            </div>
        </div>
       
        <div class="status">
            <p>Strenght:</p>
            <div class="barra-total">
                <div class="barra-valor" style="width:${data.powerstats.strength}%">
       
                    <div class="porcentagem">${data.powerstats.strength}%</div>
                </div>
            </div>
        </div>
       
        <div class="status">
            <p>Speed:</p>
            <div class="barra-total">
                <div class="barra-valor" style="width:${data.powerstats.speed}%">
       
                    <div class="porcentagem">${data.powerstats.speed}%</div>
                </div>
            </div>
        </div>
       
        <div class="status">
            <p>Durability:</p>
            <div class="barra-total">
                <div class="barra-valor" style="width:${data.powerstats.durability}%">
       
                    <div class="porcentagem">${data.powerstats.durability}%</div>
                </div>
            </div>
        </div>
       
        <div class="status">
            <p>Power:</p>
            <div class="barra-total">
                <div class="barra-valor" style="width:${data.powerstats.power}%">
       
                    <div class="porcentagem">${data.powerstats.power}%</div>
                </div>
            </div>
        </div>
       
        <div class="status">
            <p>Combat:</p>
            <div class="barra-total">
                <div class="barra-valor" style="width:${data.powerstats.combat}%">
       
                    <div class="porcentagem">${data.powerstats.combat}%</div>
                </div>
            </div>
        </div> 
       `
    } else if (biografia) {

        biografia.innerHTML = ` 

        <div class="biografia">
            <p>Name: <span>${data.name}</span></p>
        </div>
    
        <div class="biografia">
            <p>Full-Name: <span>${data.biography['full-name']}</span></p>
        </div>
    
        <div class="biografia">
            <p>Alter-Egos: <span>${data.biography['alter-egos']}</span></p>
        </div>
    
        <div class="biografia">
            <p>Aliases: <span>${data.biography['aliases']}</span></p>
        </div>
    
        <div class="biografia">
            <p>Place-Of-birht: <span>C${data.biography['place-of-birth']}</span></p>
        </div>
    
        <div class="biografia">
            <p>Fist-Appearance: <span>${data.biography['first-appearance']}</span></p>
        </div>
    
        <div class="biografia">
            <p>Publicher: <span>${data.biography['publisher']}</span></p>
        </div>
    
        <div class="biografia">
            <p>Alignment: <span>${data.biography['alignment']}</span></p>
        </div>
        `
    } else if (conexoes) {

        conexoes.innerHTML = `

    <div class="conexoes">

        <div class="afiliacao">
            <h2>Group-Affiliation:</h2>
            <p>${data.connections['group-affiliation']}</p>
        </div>

        <div class="parentes">
            <h2>Relatives:</h2>
            <p>${data.connections['relatives']}</p>
        </div>

    </div>
    `
    } else {
        document.querySelector('#aparencia').innerHTML = `
    
        <div class="aparencia">
        <img src="../img/gender.png" alt="gender">
        <p>Gender: <span>${data.appearance['gender']}</span></p>
        </div>
        
        <div class="aparencia">
        <img src="../img/race.png" alt="gender">
        <p>Race: <span>${data.appearance['race']}</span></p>
        </div>
        
        <div class="aparencia">
        <img src="../img/height.png" alt="gender">
        <p>Height: <span>${data.appearance['height'][1]}</span></p>
        </div>
        
        <div class="aparencia">
        <img src="../img/weight.png" alt="gender">
        <p>Weight: <span>${data.appearance['weight'][1]}</span></p>
        </div>
        
        <div class="aparencia">
        <img src="../img/eye.png" alt="gender">
        <p>Eye-Color: <span>${data.appearance['eye-color']}</span></p>
        </div>
        
        <div class="aparencia">
        <img src="../img/salon.png" alt="gender">
        <p>Hair-Color: <span>${data.appearance['hair-color']}</span></p>
        </div>
        `
    }
}
