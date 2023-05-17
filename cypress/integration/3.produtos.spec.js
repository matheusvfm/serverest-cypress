/// <reference types="cypress" />

import Serverest from "../services/serverest.service";
import ValidaServerest from "../services/validaServerest.service";
import Factory from "../fixtures/factory";
// ***********************************************************

describe("Casos de testes sobre a rota /produtos da API Serverest", () => {
  //GET
  it("Deve BUSCAR todos os produtos e VALIDAR a resposta da API Serverest", () => {
    Serverest.buscarProdutos().then( res => {
      ValidaServerest.validarBuscarProdutos(res)
    });
  });

  //POST
  it("Deve CADASTRAR um produto e VALIDAR a resposta da API Serverest", () => {
    Serverest.cadastrarProduto().then( res => {
      ValidaServerest.validarCadastrarProduto(res)
    });
  });
});