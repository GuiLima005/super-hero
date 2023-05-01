'use strict'

const routes = {

    '/': '/pages/powerstatus.html',
    '/biografia': '/pages/biografia.html',
    '/aparencia': '/pages/aparencia.html',
    '/conexoes': '/pages/conexoes.html',
}


const route = async () => {

    window.event.preventDefault()
    window.history.pushState({}, "", window.event.target.href)

    const path = window.location.pathname

    const route = routes[path]

    const response = await fetch(route)
    const html = await response.text()

    document.getElementById('root').innerHTML = html

}

window.route = route