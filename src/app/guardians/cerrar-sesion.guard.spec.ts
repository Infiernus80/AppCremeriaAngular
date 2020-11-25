import { TestBed } from '@angular/core/testing';

import { CerrarSesionGuard } from './cerrar-sesion.guard';

describe('CerrarSesionGuard', () => {
  let guard: CerrarSesionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CerrarSesionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
