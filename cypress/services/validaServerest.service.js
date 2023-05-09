export default class ValidaServerest {

    static validarBuscaDeUsuarios(resposta){
        expect(resposta).to.be.a('object')
        expect(resposta.body).to.haveOwnProperty('quantidade')
        expect(resposta.body.quantidade).to.be.a('number')
        expect(resposta.body.quantidade).to.be.greaterThan(3)
        expect(resposta.body).to.haveOwnProperty('usuarios')
        expect(resposta.body.usuarios).to.be.an('array')
        expect(resposta.body.usuarios[0]).to.haveOwnProperty('nome')
        expect(resposta.body.usuarios[0]).to.haveOwnProperty('email')
        expect(resposta.body.usuarios[0]).to.haveOwnProperty('password')
        expect(resposta.body.usuarios[0]).to.haveOwnProperty('administrador')
        expect(resposta.body.usuarios[0]).to.haveOwnProperty('_id')
        /* expect(resposta.body.produtos).array.forEach(element => { // Verifica por toda a array e testar todos os elementos da array, independente de seu tamanho
        });.to.haveOwnProperty('nome','email','passwprd','administrador','_id')
        expect(resposta.code).to.be.oneOf([200,201]) */
    }

    static validarCriarUsuario(resposta){
        expect(resposta).to.be.an('object')
        //expect(resposta.code).to.be.oneOf([200,201])
        expect(resposta.body).to.haveOwnProperty('message')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body.message).to.equal('Cadastro realizado com sucesso') //to.equal é a melhor opção?
        expect(resposta.body).to.haveOwnProperty('_id')
        expect(resposta.body._id).to.be.a('string')
    }

    static validarLogarUsuario(resposta){
        expect(resposta).to.be.an('object')
        //expect(resposta.body).to.not.be.empty
        //expect(resposta.code).to.be.oneOf([200,201])
        expect(resposta.body).to.haveOwnProperty('message')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body.message).to.equal('Login realizado com sucesso')
        expect(resposta.body).to.haveOwnProperty('authorization')
        expect(resposta.body.authorization).to.be.a('string')
    }

    static validarBuscarProdutos(resposta){
        const tamanhoArray = (resposta.body.produtos).length
        expect(resposta).to.be.a('object')
        expect(resposta.body).to.haveOwnProperty('quantidade')
        expect(resposta.body.quantidade).to.be.a('number')
        expect(resposta.body.quantidade).to.be.greaterThan(0)
        expect(resposta.body).to.haveOwnProperty('produtos')
        expect(resposta.body.produtos).to.be.an('array')
        expect(resposta.body.produtos[0]).to.haveOwnProperty('nome')
        expect(resposta.body.produtos[0]).to.haveOwnProperty('preco')
        expect(resposta.body.produtos[0]).to.haveOwnProperty('descricao')
        expect(resposta.body.produtos[0]).to.haveOwnProperty('quantidade')
        expect(resposta.body.produtos[0]).to.haveOwnProperty('_id')
        /* expect(resposta.body.produtos).array.forEach(element => { // Verifica por toda a array e testar todos os elementos da array, independente de seu tamanho
        });.to.haveOwnProperty('nome','preco','descricao','quantidade','_id')
        expect(resposta.code).to.be.oneOf([200,201]) */
    }

    static validarCadastrarProduto(resposta){
        expect(resposta).to.be.an('object')
        //expect(resposta.code).to.be.oneOf([200,201])
        expect(resposta.body).to.haveOwnProperty('message')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body.message).to.equal('Cadastro realizado com sucesso') //to.equal é a melhor opção?
        expect(resposta.body).to.haveOwnProperty('_id')
        expect(resposta.body._id).to.be.a('string')
    }
}