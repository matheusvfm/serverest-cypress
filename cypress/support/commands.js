import Serverest from "../services/serverest.service";
import ValidaServerest from "../services/validaServerest.service";
import Factory from "../fixtures/factory";

//ROTA rest GERAL (GET-padrão)
Cypress.Commands.add("rest",(url = "/", method = "GET", body = null, failOnStatusCode = true) => {
    //GET /usuarios
    return cy.request({
        method: method,
        url: url,
        failOnStatusCode: failOnStatusCode,
        body: body,
    });
  });


//ROTA - /usuarios
//Cypress.Commands.add("registerUser",(url) => {
Cypress.Commands.add("registerUser",(url, nome, email, password, administrador) => {
    //POST /usuarios
    //let usuario = Factory.gerarUsuario()
    return cy.request({
        method: "POST",
        url: url,
        failOnStatusCode: false,
        body: {
            "nome": nome,
            "email": email,
            "password": password,
            "administrador": administrador,
        },
        //body: usuario
    });
});

Cypress.Commands.add("registerUserAdm",(url) => {
    //POST /usuarios
    let usuario = Factory.gerarUsuarioAdm()
    return cy.request({
        method: "POST",
        url: url,
        failOnStatusCode: false,
        body: usuario
    });
});

//ROTA - /login
Cypress.Commands.add("logar",(urlUsuario, urlLogin, nome, email, password, administrador) => {
    //POST /login
    cy.registerUser(urlUsuario, nome, email, password, administrador).then("loginReal",() => {
        return cy.request({
            method: "POST",
            url: urlLogin,
            failOnStatusCode: false,
            body: {
                "email": email,
                "password": password,
            },
        });
        //Cypress.env('bearer',resposta.body.authorization.slice(7))
    });
});

Cypress.Commands.add("logar",(urlUsuario, urlLogin, nome, email, password, administrador) => {
    //POST /login
    cy.registerUser(urlUsuario, nome, email, password, administrador).then("loginReal",() => {
        return cy.request({
            method: "POST",
            url: urlLogin,
            failOnStatusCode: false,
            body: {
                "email": email,
                "password": password,
            },
        });
        //Cypress.env('bearer',resposta.body.authorization.slice(7))
    });
});

//ROTAS - /produtos
//TENTATIVA 1 ✅
//Cypress.Commands.add("registerProduct",(urlUsuario,urlLogin,urlProduto,nome,email,password) => {
/* Cypress.Commands.add("registerProduct",(urlUsuario,urlLogin,urlProduto,nome,email,password,nomeProduto,preco,descricao,quantidade) => {
    var bearerToken
    cy.logar(urlUsuario, urlLogin, nome, email, password, "true").then(response => {
        bearerToken = response.body.authorization.slice(7);
    }).then("cadastrarProduto", () => {
        let produto = Factory.gerarProduto()
        return cy.request({
            method: "POST",
            url: urlProduto,
            failOnStatusCode: true,
            //body: produto,
            body: {
                nome: nomeProduto,
                preco: preco,
                descricao: descricao,
                quantidade: quantidade,
            },
            auth:{
                bearer: bearerToken
            }
        });
    });
}); */

//TENTATIVA 2 ❌
/* Cypress.Commands.add("registerProduct",(urlUsuario,urlLogin,urlProduto,nome,email,password,nomeProduto,preco,descricao,quantidade) => {
    cy.logar(urlUsuario, urlLogin, nome, email, password, "true").then(response => {
        ("cadastrarProduto", () => {
        return cy.request({
            method: "POST",
            url: urlProduto,
            failOnStatusCode: false,
            body: {
                nome: nomeProduto,
                preco: preco,
                descricao: descricao,
                quantidade: quantidade,
            },
            auth:{
                bearer: response.body.authorization.slice(7)
            }
        });
        });
    });
}) */

//TENTATIVA 3 ✅ MElHOR
//Cypress.Commands.add("registerProduct",(urlUsuario,urlLogin,urlProduto,nome,email,password) => {
Cypress.Commands.add("registerProduct",(urlUsuario,urlLogin,urlProduto,nome,email,password,nomeProduto,preco,descricao,quantidade) => {
    cy.logar(urlUsuario, urlLogin, nome, email, password, "true").then( res => {
        Serverest.salvarBearer(res)
    }).then("cadastrarProduto", () => {
        //let produto = Factory.gerarProduto()
        return cy.request({
            method: "POST",
            url: urlProduto,
            failOnStatusCode: true,
            body: {
                nome: nomeProduto,
                preco: preco,
                descricao: descricao,
                quantidade: quantidade,
            },
            //body: produto,
            auth:{
                bearer: Cypress.env('bearer')
            }
        });
    });
});

//TENTATIVA 4 ❌
/* Cypress.Commands.add("registerProduct",(urlUsuario,urlLogin,urlProduto,nome,email,password,nomeProduto,preco,descricao,quantidade) => {
    cy.logar(urlUsuario, urlLogin, nome, email, password, "true").then( res => {
        cy.wrap({
            authorization: res.body.authorization.slice(7)
        }).as('tokenAdm')
    }).then("cadastrarProduto", () => {
        return cy.request({
            method: "POST",
            url: urlProduto,
            failOnStatusCode: true,
            body: {
                nome: nomeProduto,
                preco: preco,
                descricao: descricao,
                quantidade: quantidade,
            },
            auth:{
                bearer: cy.get('@tokenAdm')
            }
        });
    });
}); */

/* //ROTAS - /carrinhos
Cypress.Commands.add("registerCart",(urlUsuario,urlLogin,urlProduto,UrlCarrinho,nome,email,password,nomeProduto,preco,descricao,quantidade) => {
    var idProduct
    cy.registerProduct(urlUsuario,urlLogin,urlProduto,nome,email,password,nomeProduto,preco,descricao,quantidade).then(response => {
        idProduct = response.body._id;
    }).then("cadastrarCarrinho", () => {
        return cy.request({
            method: "POST",
            url: UrlCarrinho,
            failOnStatusCode: true,
            body: {
                produtos:
                [
                    idProduto: idProduct,
                    quantidade: 1
                ]
            },
            auth:{
                bearer: Cypress.env('bearer') //necessário usar o código da tentativa 3 de registrar produtos
            }
        });
    });
}); */



/* Cypress.Commands.add('buscarUsuarioParaLogin', () => {
    cy.rest('GET', '/usuarios').then( res => {
        return usuarioValido = {
            email: res.body.usuarios[0].email,
            senha: res.body.usuarios[0].password
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
