export default class ValidaServerest {

    static validarBuscaDeUsuarios(resposta){
        expect(resposta).to.be.a('object')
        expect(resposta.code).to.be.oneOf([200,201])
        expect(resposta.body.quantidade).to.be.a('number')
        expect(resposta.body.quantidade).to.be.greaterThan(3)
        expect(resposta.body.usuarios).to.be.an('array')
        /* expect(resposta.body.usuarios).to.haveOwnProperty('nome')
        expect(resposta.body.usuarios).to.haveOwnProperty('email')
        expect(resposta.body.usuarios).to.haveOwnProperty('password')
        expect(resposta.body.usuarios).to.haveOwnProperty('administrador')
        expect(resposta.body.usuarios).to.haveOwnProperty('_id') */
    }

    static validarCriarUsuario(resposta){
        expect(resposta).to.be.an('object')
        //expect(resposta.code).to.be.oneOf([200,201])
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body.message).to.equal('Cadastro realizado com sucesso') //to.equal é a melhor opção?
        expect(resposta.body._id).to.be.a('string')
    }

    static validarLogarUsuario(resposta){
        expect(resposta).to.be.an('object')
        //expect(resposta.body).to.not.be.empty
        //expect(resposta.code).to.be.oneOf([200,201])
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body.message).to.equal('Login realizado com sucesso')
        expect(resposta.body.authorization).to.be.a('string')
    }
}