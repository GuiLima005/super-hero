'use strict'

const routes = {

    '/super-hero': '/pages/powerstats.html',
    '/super-hero/biografia': '/pages/biografia.html',
    '/super-hero/aparencia': '/pages/aparencia.html',
    '/super-hero/conexoes': '/pages/conexoes.html',
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