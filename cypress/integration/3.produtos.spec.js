/// <reference types="cypress" />

import Serverest from "../services/serverest.service";
import ValidaServerest from "../services/validaServerest.service";
import Factory from "../fixtures/factory";
// ***********************************************************

describe("Casos de testes sobre a rota /login da API Serverest", () => {
  //POST
  it.only("Deve CADASTRAR e VALIDAR o PRODUTO na Serverest", () => {
    Serverest.cadastrarProduto().then( res => {
      ValidaServerest.validarCadastrarProduto(res)
      //Serverest.salvarBearer(res)
    });
  });

  //GET
  it("Deve BUSCAR e VALIDAR os PRODUTOS na Serverest", () => {
    Serverest.buscarProdutos().then( res => {
      ValidaServerest.validarBuscarProdutos(res)
    });
  });

});