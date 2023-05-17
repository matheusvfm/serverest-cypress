//const faker = require('faker');
import { faker } from '@faker-js/faker'

export default class Factory {

    static gerarProduto() {
        return {
            "nome": faker.commerce.productName(),
            "preco": faker.datatype.number(),
            "descricao": faker.commerce.productDescription(),
            "quantidade": faker.datatype.number()
        }
    }

    static gerarUsuario() {
        //let adm = faker.datatype.boolean()
        return {
            "nome": faker.name.middleName(),
            "email": faker.internet.email(),
            "password": faker.internet.password(),
            "administrador": `${faker.datatype.boolean()}`//quando se chama uma função do faker dentro de uma string necessário utilizar dessa forma.
        }
    }

    static gerarUsuarioAdm() {
        return {
            "nome": faker.name.middleName(),
            "email": faker.internet.email(),
            "password": faker.internet.password(),
            "administrador": "true"
        }
    }

 static gerarInteiroAleatorio() {
    return faker.datatype.number()
} 
}