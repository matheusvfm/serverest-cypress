/// <reference types="cypress" />

import Serverest from "../services/serverest.service";
import ValidaServerest from "../services/validaServerest.service";
import Factory from "../fixtures/factory";
// ***********************************************************

describe("Casos de testes sobre a rota /login da API Serverest", () => {
  //POST
  it("Deve LOGAR em um USUARIO existente e VALIDAR a resposta da API Serverest", () => {
    Serverest.logarUsuario().then( res => {
      ValidaServerest.validarLogarUsuario(res)
      //Serverest.salvarBearer(res) ---> opção de colocar aqui, mas não deixa cada command independente
    });
  });
});
