const URL_USUARIOS = "/usuarios";
const URL_LOGIN = "/login";
const URL_PRODUTOS = "/produtos";
const URL_CARRINHOS = "/carrinhos";

export default class Serverest {
  //Preciso tornar os parâmetros dinâmicos com o Faker
  //REQUISIÇÕES COM O VERBO GET (all, sem _id)
  static buscarUsuarios() {
      return cy.rest(URL_USUARIOS);
  }

  static buscarProdutos() {
      return cy.rest(URL_PRODUTOS);
  }

  static buscarCarrinhos() {
      return cy.rest(URL_CARRINHOS);
  }

  //POST /usuarios
  static cadastrarUsuario() {
      return cy.registerUser(URL_USUARIOS/* ,"matheus vitor","dffsss@hotmail.com","senha123","false" */);
  }

  //POST /login
  static logarUsuario() {
      return cy.logar(URL_USUARIOS,URL_LOGIN/* ,"matheus vitor","dff55566666ll@hotmail.com","senha123","true" */);
  }

/*   static salvarToken() {
      cy.logar(URL_USUARIOS,URL_LOGIN,"matheus vitor","dff55566666ll@hotmail.com","senha123","true").then( res => {
          cy.wrap({
              authorization: res.body.authorization
          }).as('tokenAdm')
      })
  } */

  //SALVA TOKEN DE AUTHORIZATION DO LOGIN
  static salvarBearer(resposta) {
      Cypress.env('bearer',resposta.body.authorization.slice(7))
      cy.log(">>>>>" + Cypress.env('bearer'))
  }

  //POST /produtos
  static cadastrarProduto() {
      //return cy.registerProduct(URL_USUARIOS,URL_LOGIN,URL_PRODUTOS,"kurt cobain","rullkallos2@gmail10.com","senha123","Mouse modernaço v3","25","lorem ipsum","60");
      return cy.registerProduct(URL_USUARIOS,URL_LOGIN,URL_PRODUTOS,"kurt cobain","rullkallos2@gmail10.com","senha123");
  }
  
  //POST /carrinhos
  static cadastrarCarrinho() {
    return cy.registerCart(URL_USUARIOS,URL_LOGIN,URL_PRODUTOS,URL_CARRINHOS,"kurt cobain","rullkallos15@gmail.com","senha123","Mouse moderno v15","25","lorem ipsum","60")
  }  

  /* static logarUsuario() { //Sem uso no meu código (fins de estudo)
        CY.buscarUsuarioParaLogin.then(usuarioValido => {

        })
        return cy.logar(emailValido, senhaValida)
    }
*/
}
