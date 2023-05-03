/// <reference types="cypress" />

import Serverest from "../services/serverest.service";
import ValidaServerest from "../services/validaServerest.service";
import Factory from "../fixtures/factory";
// ***********************************************************
//POST
describe("Casos de testes sobre a rota /login da API Serverest", () => {
  it.only("Deve LOGAR e VALIDAR o usuario que foi cadastrado na Serverest", () => {
    Serverest.logarUsuario().then((res) => {
      ValidaServerest.validarLogarUsuario(res);
    });
  });
});
