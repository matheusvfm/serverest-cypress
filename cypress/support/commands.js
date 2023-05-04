import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'
import Factory from '../fixtures/factory'

//ROTAS - /usuarios
Cypress.Commands.add('rest', (method = 'GET', url = '/', body = null, failOnStatusCode = false) => {
    return cy.request({
        method: method,
        url: url,
        failOnStatusCode: failOnStatusCode,
        body: body
    })
})

Cypress.Commands.add('registerUser', (url,nome,email,password,administrador) => {
    return cy.request({
        method: 'POST',
        url: url,
        failOnStatusCode: false,
        body: {
            "nome": nome,
            "email": email,
            "password": password,
            "administrador": administrador
        }
    })
})

Cypress.Commands.add('logar', (urlCriarUser,urlLogar,nome,email,password,administrador) => {
    const emailCriado = email
    const senhaCriada = password
    const nomeCriado = nome
    const admCriado = administrador
    const urlUsuario = urlCriarUser
    const urlLogin = urlLogar
    cy.registerUser(urlUsuario,nomeCriado,emailCriado,senhaCriada,admCriado).then('loginReal', (url) => {
        //url = urlLogin    ----> Outra possibilidade, deve ser colocado o parâmetro da função 'loginReal' como url também.
        return cy.request({
            method: 'POST',
            url: url,
            failOnStatusCode: false,
            body: {
                "email": emailCriado,
                "password": senhaCriada
            }
        })
    }) 
})

/* Cypress.Commands.add('logar', (url1,nome,email,password,administrador) => {
    const emailCriado = email;
    const senhaCriada = password;
    cy.request({
        method: 'POST',
        url: url1,
        failOnStatusCode: true,
        body: {
            "nome": nome,
            "email": email,
            "password": password,
            "administrador": administrador
        }
    }).then('loginReal', (url2) => { //como usar os mesmos argumentos passados na função anterior nessa função?
        return cy.request({
            method: 'POST',
            url: url2,
            failOnStatusCode: true,
            body: {
                "email": emailCriado,
                "password": senhaCriada
            }
        })
    }) 
}) */

/* Cypress.Commands.add('createUser', url = '/', (nome, email, password, administrador) => { //como transformar 'url' em parametro?
    return cy.request({
        method: 'POST',
        url: url,
        failOnStatusCode: false,
        body: {
            "nome": nome,
            "email": email,
            "password": password,
            "administrador": administrador
        }
    })
}) */

/* Cypress.Commands.add('buscarUsuarioParaLogin', () => {
    cy.rest('GET', '/usuarios').then( res => {
        return usuarioValido = {
            email: res.body.usuarios[0].email,
            senha: res.body.usuarios[0].password
        }
    })
})

Cypress.Commands.add('logar', (email, senha) => {
    cy.request({
        method: 'POST',
        url: '/login',
        failOnStatusCode: false,
        body: {
            "email": email,
            "password": senha
        }
    })
})

Cypress.Commands.add('postUserSemSucesso', () => {
    return cy.request({
        method: 'POST',
        url: '/usuarios',
        failOnStatusCode: false,
        body: {
            "nome": "Rick W-177",
            "email": "rickW-177@intergalactic.com",
            "password": "177_shut_up_M0rty",
            "administrador": "true",
        }
    })
}) */

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
//https://on.cypress.io/custom-commands
// ***********************************************
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })