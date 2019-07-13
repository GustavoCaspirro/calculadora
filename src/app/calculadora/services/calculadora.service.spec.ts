import { TestBed, inject } from '@angular/core/testing';

import { CalculadoraService } from './calculadora.service';

describe('CalculadoraService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [CalculadoraService]
  }));

  it('should ...', inject([CalculadoraService],
    (service: CalculadoraService) => {
      expect(service).toBeTruthy();
    }));

  it('deve garantir que 1 + 4 = 5',
    inject([CalculadoraService], (service: CalculadoraService) => {
      const sum = service.calculate(1, 4, CalculadoraService.SUM);
      expect(sum).toEqual(5);
    })
  );

  it('deve garantir que 1 - 4 = -3',
    inject([CalculadoraService], (service: CalculadoraService) => {
      const subtraction = service.calculate(1, 4, CalculadoraService.SUBTRACTION);
      expect(subtraction).toEqual(-3);
    })
  );

  it('deve garantir que 1 / 4 = 0.25',
    inject([CalculadoraService], (service: CalculadoraService) => {
      const division = service.calculate(1, 4, CalculadoraService.DIVISION);
      expect(division).toEqual(0.25);
    })
  );

  it('deve garantir que 1 * 4 = 4',
    inject([CalculadoraService], (service: CalculadoraService) => {
      const multiplication = service.calculate(1, 4, CalculadoraService.MULTIPLICATION);
      expect(multiplication).toEqual(4);
    })
  );

  it('deve retornar 0 para operação inválida',
    inject([CalculadoraService], (service: CalculadoraService) => {
      const invalidOperation = service.calculate(1, 4, '%');
      expect(invalidOperation).toEqual(0);
    })
  );
});
