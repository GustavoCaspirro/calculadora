import { Component, OnInit } from '@angular/core';

import { CalculadoraService } from '../services';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  // template: '<span>teste</span>',
  styleUrls: ['./calculadora.component.scss']
})
export class CalculadoraComponent implements OnInit {

  private number1: string; // private -> só poder ser acessado dentro desta classe;
  private number2: string;
  private result: number;
  private operation: string;
  public memoryNumbers: Array<string>;

  constructor(private calculadoraService: CalculadoraService) { }

  ngOnInit() {
    this.clean();
  }

  /**
   * Inicializa todos os operadores para os valores padrão.
   *
   * @return void
   */
  clean(): void {
    this.number1 = '0';
    this.number2 = null;
    this.result = null;
    this.operation = null;
    this.memoryNumbers = [];
  }

  /**
   * Limpa a lista de mémoria dos números e operados já digitados
   *
   * @return void
   */
  cleanListMemoryNumbers() {
    this.memoryNumbers = [];
  }

  /**
   * Adiciona o número selecionado para o cálculo posteriormente.
   *
   * @param string numero
   * @return void
   */
  addNumber(reportedNumber: string): void {
    if (this.operation === null) {
      this.number1 = this.concatenateNumber(this.number1, reportedNumber);

    } else {
      this.number2 = this.concatenateNumber(this.number2, reportedNumber);
    }
  }

  /**
   * Retorna o valor concatenado. Trata o separador decimal.
   *
   * @param string numAtual
   * @param string numConcat
   * @return string
   */
  concatenateNumber(numCurrent: string, numConcat: string): string {
    // caso contenha apenas '0' ou null, reinicia o valor
    if (numCurrent === '0' || numCurrent === null) {
      numCurrent = '';
    }

    // primeiro dígito é '.', concatena '0' antes do ponto
    if (numConcat === '.' && numCurrent === '') {
      return '0.';
    }

    // caso '.' digitado e já contenha um '.', apenas retorna
    if (numConcat === '.' && numCurrent.indexOf('.') > -1) {
      return numCurrent;
    }

    this.memoryNumbers.push(numConcat);
    return numCurrent + numConcat;
  }

  /**
   * Executa lógica quando um operador for selecionado.
   * Caso já possua uma operação selecionada, executa a
   * operação anterior, e define a nova operação.
   * @param string operação
   * @return void
   */
  setOperation(operation: string): void {
    // apenas define a operação caso não exista uma
    if (this.operation === null) {
      this.operation = operation;
      this.memoryNumbers.push(operation);
      return;
    }

    /* caso operação definida e número 2 selecionado,
       efetua o cálculo da operação */
    if (this.number2 !== null) {
      this.result = this.calculadoraService.calculate(parseFloat(this.number1), parseFloat(this.number2), this.operation);
      this.operation = operation;
      this.memoryNumbers.push(operation);
      this.number1 = this.result.toString();
      this.number2 = null;
      this.result = null;
    }
  }

  /**
   * Efetua o cálculo de uma operação.
   *
   * @return void
   */
  calculate(): void {
    if (this.number2 === null) {
      return;
    }

    this.result = this.calculadoraService.calculate(parseFloat(this.number1), parseFloat(this.number2), this.operation);

    this.cleanListMemoryNumbers();
  }

  /**
   * Retorna o valor a ser exibido na tela da calculadora.
   *
   * @return string
   */
  get display(): string {
    if (this.result !== null) {
      return this.result.toString();
    }

    if (this.number2 !== null) {
      return this.number2;
    }
    return this.number1;
  }

}
