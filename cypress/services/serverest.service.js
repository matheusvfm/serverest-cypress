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
    return cy.registerUser(URL_USUARIOS,"matheus vitor","dffsss@hotmail.com","senha123","false");
  }

  //POST /login
  static logarUsuario() {
    return cy.logar(URL_USUARIOS,URL_LOGIN,"matheus vitor","dff55566666ll@hotmail.com","senha123","true");
  }

  static salvarBearer(resposta){
    Cypress.env('bearer',resposta.body.authorization.slice(7))
    //cy.log(">>>>>" + Cypress.env('bearer'))
  }

  //POST /produtos
  static cadastrarProduto() {
    return cy.registerProduct(URL_USUARIOS,URL_LOGIN,URL_PRODUTOS,"kurt cobain","kutcobain@gmail.com","senha123","Mouse moderno","25","lorem ipsum","60",cy.salvarBearer);
  }

  /*
    //REQUISIÇÕES COM A ROTA /carrinhos
    static cadastrarCarrinho(){
        return cy.registerCart(URL_CARRINHOS, ('idProduto','quantidade')) //Preciso tornar os parâmetros dinâmicos com o Faker //Porque URL não está sendo setada?
    } */

  //AJUSTANDO PARÂMETROS
  /* static logarUsuario() {
        CY.buscarUsuarioParaLogin.then(usuarioValido => {

        })
        return cy.logar(emailValido, senhaValida)
    }
*/
}
