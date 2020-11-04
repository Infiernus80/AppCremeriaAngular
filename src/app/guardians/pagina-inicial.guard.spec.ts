import { TestBed } from '@angular/core/testing';

import { PaginaInicialGuard } from './pagina-inicial.guard';

describe('PaginaInicialGuard', () => {
  let guard: PaginaInicialGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PaginaInicialGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
