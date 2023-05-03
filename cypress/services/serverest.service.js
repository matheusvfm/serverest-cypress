const URL_USUARIOS  = '/usuarios'
const URL_LOGIN     = '/login'
const URL_PRODUTOS  = '/produtos'
const URL_CARRINHOS = '/carrinhos'

export default class Serverest {
    //REQUISIÇÕES COM A ROTA /usuarios
    static buscarUsuarios(){
        return cy.rest('GET', URL_USUARIOS)
    }

    static cadastrarUsuario(){ //GOSTARIA DE FAZER DA FORMA ABAIXO
        return cy.registerUser(URL_USUARIOS,'matheus vitor', 'dffsss@hotmail.com','senha123','false')
    }

    //REQUISIÇÕES COM A ROTA /login
    static logarUsuario() {
        return cy.logar('matheus vitor', 'dff@hotmail.com','senha123','true')
    }

    /* static cadastrarUsuario(){
        return cy.registerUser(URL_USUARIOS, ('nomePessoa','email@email.com', 'descricao', 'adm')) //Preciso tornar os parâmetros dinâmicos com o Faker //Porque URL não está sendo setada?
    } */

    /* //REQUISIÇÕES COM A ROTA /produtos

    static buscarProdutos(){
        return cy.rest('GET', URL_PRODUTOS)
    }

    static cadastrarProduto(){
        return cy.registerProducts(URL_PRODUTOS, ('nomeProduto','preco', 'descricao', 'quantidade')) //Preciso tornar os parâmetros dinâmicos com o Faker //Porque URL não está sendo setada?
    }

    //REQUISIÇÕES COM A ROTA /carrinhos

    static buscarCarrinhos(){
        return cy.rest('GET', URL_CARRINHOS)
    }

    static cadastrarCarrinho(){
        return cy.registerCart(URL_CARRINHOS, ('idProduto','quantidade')) //Preciso tornar os parâmetros dinâmicos com o Faker //Porque URL não está sendo setada?
    } */

    


    //AJUSTANDO PARÂMETROS
    /* static logarUsuario() {
        CY.buscarUsuarioParaLogin.then(usuarioValido => {

        })
        return cy.logar(emailValido, senhaValida)
    }*/
}
