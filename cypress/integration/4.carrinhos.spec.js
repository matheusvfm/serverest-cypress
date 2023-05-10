/// <reference types="cypress" />

import Serverest from "../services/serverest.service";
import ValidaServerest from "../services/validaServerest.service";
import Factory from "../fixtures/factory";
// ***********************************************************

describe("Casos de testes sobre a rota /login da API Serverest", () => {
  //POST
  it("Deve CADASTRAR e VALIDAR o PRODUTO na Serverest", () => {
    Serverest.cadastrarCarrinho().then( res => {
        ValidaServerest.validarCadastrarCarrinho(res)
    });
  });

  //GET
  it.only("Deve BUSCAR e VALIDAR os PRODUTOS na Serverest", () => {
    Serverest.buscarCarrinhos().then( res => {
      //console.log(res)
      ValidaServerest.validarBuscarCarrinhos(res)
    });
  });

});