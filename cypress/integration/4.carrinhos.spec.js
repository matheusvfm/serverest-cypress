/// <reference types="cypress" />

import Serverest from "../services/serverest.service";
import ValidaServerest from "../services/validaServerest.service";
//import Factory from "../fixtures/factory";
// ***********************************************************

describe("Casos de testes sobre a rota /carrinhos da API Serverest", () => {
  //GET
  it("Deve BUSCAR todos CARRINHOS e VALIDAR a resposta da API Serverest", () => {
    Serverest.buscarCarrinhos().then( res => {
      //console.log(res)
      ValidaServerest.validarBuscarCarrinhos(res)
    });
  });

  //POST
  it.only("Deve CADASTRAR um CARRINHO e VALIDAR a resposta da API Serverest", () => {
    Serverest.cadastrarCarrinho().then( res => {
      ValidaServerest.validarCadastrarCarrinho(res)
    });
  });
});