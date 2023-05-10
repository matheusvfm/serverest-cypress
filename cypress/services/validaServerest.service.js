export default class ValidaServerest {

    static validarBuscarUsuarios(resposta){
        expect(resposta).to.be.an('object')
        expect(resposta.body).exist
        expect(resposta.body).to.have.property('quantidade')
        expect(resposta.body.quantidade).to.be.a('number')
        expect(resposta.body.quantidade).to.be.greaterThan(1)
        expect(resposta.body).to.have.property('usuarios')
        expect(resposta.body.usuarios).to.be.an('array')
        for(let each in usuarios){
            expect(usuarios[each]).to.haveOwnProperty('nome')
            expect(usuarios[each].nome).to.be.a('string')
            expect(usuarios[each]).to.haveOwnProperty('email')
            expect(usuarios[each].email).to.be.a('string')
            expect(usuarios[each]).to.haveOwnProperty('password')
            expect(usuarios[each].password).to.be.a('string')
            expect(usuarios[each]).to.haveOwnProperty('administrador')
            expect(usuarios[each].administrador).to.be.a('string')
            expect(usuarios[each]).to.haveOwnProperty('_id')
            expect(usuarios[each]._id).to.be.a('string')
        }
        //expect(resposta.code).to.be.oneOf([200,201])
    }

    static validarCriarUsuario(resposta){
        expect(resposta).to.be.an('object')
        expect(resposta.body).to.haveOwnProperty('message')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body.message).to.equal('Cadastro realizado com sucesso') //to.equal é a melhor opção?
        expect(resposta.body).to.haveOwnProperty('_id')
        expect(resposta.body._id).to.be.a('string')
        //expect(resposta.code).to.be.oneOf([200,201])
    }

    static validarLogarUsuario(resposta){
        expect(resposta).to.be.an('object')
        expect(resposta.body).exist
        expect(resposta.body).to.haveOwnProperty('message')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body.message).to.equal('Login realizado com sucesso')
        expect(resposta.body).to.haveOwnProperty('authorization')
        expect(resposta.body.authorization).to.be.a('string')
        //expect(resposta.code).to.be.oneOf([200,201])
    }

    static validarBuscarProdutos(resposta){ //necessário ajustar para um laço for
        expect(resposta).to.be.a('object')
        expect(resposta.body).to.haveOwnProperty('quantidade')
        expect(resposta.body.quantidade).to.be.a('number')
        expect(resposta.body.quantidade).to.be.greaterThan(0)
        expect(resposta.body).to.haveOwnProperty('produtos')
        expect(resposta.body.produtos).to.be.an('array')
        for(let each of produtos){
            expect(produtos[each]).to.have.property('nome')
            expect(produtos[each].nome).to.be.a('string')
            expect(produtos[each]).to.have.property('preco')
            expect(produtos[each].preco).to.be.a('number')
            expect(produtos[each]).to.have.property('descricao')
            expect(produtos[each].descricao).to.be.a('string')
            expect(produtos[each]).to.have.property('quantidade')
            expect(produtos[each].quantidade).to.be.a('number')
            expect(produtos[each]).to.have.property('_id')
            expect(produtos[each]._id).to.be.a('string')
        }
        //expect(resposta.code).to.be.oneOf([200,201])
    }

    static validarCadastrarProduto(resposta){
        expect(resposta).to.be.an('object')
        expect(resposta.body).to.haveOwnProperty('message')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body.message).to.equal('Cadastro realizado com sucesso') //to.equal é a melhor opção?
        expect(resposta.body).to.haveOwnProperty('_id')
        expect(resposta.body._id).to.be.a('string')
        //expect(resposta.code).to.be.oneOf([200,201])
    }

    static validarBuscarCarrinhos(resposta){
        expect(resposta).to.be.an('object')
        expect(resposta.body).exist
        expect(resposta.body).to.have.property('quantidade')
        expect(resposta.body.quantidade).to.be.a('number')
        expect(resposta.body.quantidade).to.be.greaterThan(0)
        expect(resposta.body).to.have.property('carrinhos')
        //expect(resposta.body.produtos).to.be.a('array') //porque isso é undefined?
        let carrinhos = resposta.body.carrinhos
        for(let each in carrinhos){
            expect(carrinhos[each]).to.have.property('produtos')
            expect(carrinhos[each].produtos).to.be.an('array')
            expect(carrinhos[each]).to.have.property('precoTotal')
            expect(carrinhos[each].precoTotal).to.be.a('number')
            expect(carrinhos[each]).to.have.property('quantidadeTotal')
            expect(carrinhos[each].quantidadeTotal).to.be.a('number')
            expect(carrinhos[each]).to.have.property('idUsuario')
            expect(carrinhos[each].idUsuario).to.be.a('string')
            expect(carrinhos[each]).to.have.property('_id')
            expect(carrinhos[each]._id).to.be.a('string')
            let produtos = resposta.body.carrinhos.produtos//erro aqui
            for(let cada in produtos){
                expect(produtos[cada]).to.haveOwnProperty('idProduto')
                expect(produtos[cada].idProduto).to.be.a('string')
                expect(produtos[cada]).to.haveOwnProperty('quantidade')
                expect(produtos[cada].quantidade).to.be.a('number')
                expect(produtos[cada]).to.haveOwnProperty('precoUnitario')
                expect(produtos[cada].precoUnitario).to.be.a('number')
            }
        }
        //expect(resposta.code).to.be.oneOf([200,201])
    }

    static validarCadastrarCarrinho(resposta){
        expect(resposta).to.be.an('object')
        expect(resposta.body).to.have.property('produtos')
        expect(resposta.body.produtos).to.be.an('array')
        for(let each in produtos){
            expect(produtos[each]).to.have.property('idProduto')
            expect(produtos[each].idProduto).to.be.a('string')
            expect(produtos[each]).to.have.property('quantidade')
            expect(produtos[each].quantidade).to.be.a('number')
        }
        //expect(resposta.code).to.be.oneOf([200,201])
    }
}