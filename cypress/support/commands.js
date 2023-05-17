import Serverest from "../services/serverest.service";
//import ValidaServerest from "../services/validaServerest.service";
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
Cypress.Commands.add("registerUser",(url/* , nome, email, password, administrador */) => {
    //POST /usuarios
    let randomUser = Factory.gerarUsuario()
    cy.writeFile('./cypress/fixtures/usuario.json',randomUser)
    return cy.request({
        method: "POST",
        url: url,
        failOnStatusCode: false,
        body: randomUser,
    });
});

Cypress.Commands.add("registerUserAdm",(url) => {
    //POST /usuarios
    let randomUserAdm = Factory.gerarUsuarioAdm()
    cy.writeFile('./cypress/fixtures/usuario.json',randomUserAdm)
    return cy.request({
        method: "POST",
        url: url,
        failOnStatusCode: false,
        body: randomUserAdm
    });
});

//ROTA - /login
Cypress.Commands.add("logar",(urlUsuario, urlLogin/* , nome, email, password, administrador */) => {
    //POST /login
    cy.registerUser(urlUsuario/* , nome, email, password, administrador */).then("loginReal",() => {
        cy.fixture('usuario.json').then( user => {
            let usuario = {
                email: user.email,
                password: user.password
            }
            return usuario 
        }).then(usuarioCriado => {
        return cy.request({
            method: "POST",
            url: urlLogin,
            failOnStatusCode: false,
            body: usuarioCriado,  //está vindo vazio, deveria estar chamando a variável criado no cy.fixture
        });
        })
        //Cypress.env('bearer',resposta.body.authorization.slice(7))  ---> possibilidade de atribuir aqui ao invés de utilizar o método salvarBearer do serverest.service.
    });
});

Cypress.Commands.add("logarAdm",(urlUsuario, urlLogin/*  , nome, email, password, administrador  */) => {
    //POST /login
    cy.registerUserAdm(urlUsuario/* , nome, email, password, administrador */).then("loginRealAdm",() => {
        cy.fixture('usuario.json').then( userAdm => {
            let usuarioAdm = {
                email: userAdm.email,
                password: userAdm.password
            }
            return usuarioAdm
        }).then( usuarioCriadoAdm => {
        return cy.request({
            method: "POST",
            url: urlLogin,
            failOnStatusCode: false,
            body: usuarioCriadoAdm,  //está vindo vazio, deveria estar chamando a variável criado no cy.fixture
        })
        });
        //Cypress.env('bearer',resposta.body.authorization.slice(7))  ---> possibilidade de atribuir aqui ao invés de utilizar o método salvarBearer do serverest.service.
    });
});

//ROTAS - /produtos
//TENTATIVA 1 ✅ MElHOR ---> utlizando método (salvarBearer) criado no service
Cypress.Commands.add("registerProduct",(urlUsuario,urlLogin,urlProduto/* ,nome,email,password,nomeProduto,preco,descricao,quantidade */) => {
    cy.logarAdm(urlUsuario, urlLogin).then( res => {
        Serverest.salvarBearer(res)
    }).then("cadastrarProduto", () => {
        let produto = Factory.gerarProduto()
        cy.writeFile('./cypress/fixtures/produto.json',produto)
        return cy.request({
            method: "POST",
            url: urlProduto,
            failOnStatusCode: false,
            body: produto,
            auth:{
                bearer: Cypress.env('bearer')
            }
        });
    });
});

//TENTATIVA 2 ✅ ---> utilizado variável diretamente tirada da response do logarAdm para o request desse commands
/* Cypress.Commands.add("registerProduct",(urlUsuario,urlLogin,urlProduto,nome,email,password,nomeProduto,preco,descricao,quantidade) => {
    var bearerToken
    cy.logarAdm(urlUsuario, urlLogin, nome, email, password, "true").then(response => {
        bearerToken = response.body.authorization.slice(7);
    }).then("cadastrarProduto", () => {
        let produto = Factory.gerarProduto()
        cy.writeFile('./cypress/fixtures/produto.json',produto)
        return cy.request({
            method: "POST",
            url: urlProduto,
            failOnStatusCode: true,
            body: produto,
            auth:{
                bearer: bearerToken
            }
        });
    });
}); */

//TENTATIVA 3 ❌ ---> tentado utilizar fuunção utilizando da response do logarAdm (erro a se estudar, se é possível declarar função utilizando de resposta de função anterior)
/* Cypress.Commands.add("registerProduct",(urlUsuario,urlLogin,urlProduto,nome,email,password,nomeProduto,preco,descricao,quantidade) => {
    cy.logarAdm(urlUsuario, urlLogin, nome, email, password, "true").then(response => {
        ("cadastrarProduto", () => {
            let produto = Factory.gerarProduto()
            cy.writeFile('./cypress/fixtures/produto.json',produto)
            return cy.request({
                method: "POST",
                url: urlProduto,
                failOnStatusCode: false,
                body: produto,
                auth:{
                    bearer: response.body.authorization.slice(7)
                }
            });
        });
    });
}) */


//TENTATIVA 4 ❌ ---> utilizado o wrap e get para salvar variável e utilizá-la (erro a se estudar)
/* Cypress.Commands.add("registerProduct",(urlUsuario,urlLogin,urlProduto,nome,email,password,nomeProduto,preco,descricao,quantidade) => {
    cy.logarAdm(urlUsuario, urlLogin, nome, email, password, "true").then( res => {
        cy.wrap({
            authorization: res.body.authorization.slice(7)
        }).as('tokenAdm')
    }).then("cadastrarProduto", () => {
        let produto = Factory.gerarProduto()
        cy.writeFile('./cypress/fixtures/produto.json',produto)
        return cy.request({
            method: "POST",
            url: urlProduto,
            failOnStatusCode: true,
            body: produto,
            auth:{
                bearer: cy.get('@tokenAdm')
            }
        });
    });
}); */

//ROTAS - /carrinhos
Cypress.Commands.add("registerCart",(urlUsuario,urlLogin,urlProduto,UrlCarrinho/* ,nome,email,password,nomeProduto,preco,descricao,quantidade */) => {
    var idProduct
    cy.registerProduct(urlUsuario,urlLogin,urlProduto/* ,nome,email,password,nomeProduto,preco,descricao,quantidade */).then(response => {
        idProduct = response.body._id;
    }).then("cadastrarCarrinho", () => {
        return cy.request({
            method: "POST",
            url: UrlCarrinho,
            failOnStatusCode: true,
            body: {
                produtos:
                [
                    {
                        idProduto: idProduct,
                        quantidade: 1
                    }
                ]
            },
            auth:{
                bearer: Cypress.env('bearer') //necessário usar o código da tentativa 1 de registrar produtos
            }
        });
    });
});



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
