/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'
import Factory from '../fixtures/factory'
// ***********************************************************

describe("Casos de testes sobre a rota /usuarios da API Serverest", () => {
    //GET
    it("Deve BUSCAR todos os USUARIOS e VALIDAR a resposta da API Serverest", () => {
        Serverest.buscarUsuarios().then( res => {
            ValidaServerest.validarBuscarUsuarios(res)
        })
    })

    //POST
    it.only("Deve CADASTRAR um USUARIO com dados validos e VALIDAR a resposta da API Serverest", () => {
        Serverest.cadastrarUsuario().then( res => {
            ValidaServerest.validarCriarUsuario(res)
        })
    })
    
    /* it("Não deve postar um novo user adm existente", () => {
        cy.postUserSemSucesso().then( res => {
            expect(res).to.be.a('object')
            expect(res.body.message).to.be.a('string')
            expect(res.body.quantidade).to.be.eq('Este email já está sendo usado')
        })
    })
    
    //Exemplo de como verificar o log da resposta do comando em forma de string
    it('Deve validar o comando personalizad', () => {
        cy.rest('GET', '/usuarios').then( res => {
            expect(res).to.be.a('object')
            cy.log(JSON.stringify(res))
        })
    }) */
})
