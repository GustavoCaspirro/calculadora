/**
 * Serviço responsável por executar as operações da calculadora
 * @author Gustavo Caspirro
 * @since 1.0.0
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {

  // Definição das constantes utilizadas para os cálculos
  // ** Convenção colar as constantes em uppercase "CONSTANTES" **
  static readonly SUM: string = '+'; // readonly -> valor só pode ser lido, não pode ser alterado
  static readonly SUBTRACTION: string = '-'; // static -> ajuda no acesso da constante
  static readonly DIVISION: string = '/';
  static readonly MULTIPLICATION: string = '*';

  constructor() { }

  /**
   * Método que calcula uma operação matemática dados dois números.
   * Suporta as operações soma, subtração, divisão e multiplicação
   * @param num1 number
   * @param num2 number
   * @param operation string Operação a ser executada
   * @return number Resultado da operação
   */

  calculate(num1: number, num2: number, operation: string): number {
    let result: number; // Armazena o resultado da operação

    switch (operation) {
      case CalculadoraService.SUM:
        result = num1 + num2;
        break;
      case CalculadoraService.SUBTRACTION:
        result = num1 - num2;
        break;
      case CalculadoraService.DIVISION:
        result = num1 / num2;
        break;
      case CalculadoraService.MULTIPLICATION:
        result = num1 * num2;
        break;
      default:
        result = 0;
    }

    return result;
  }
}
