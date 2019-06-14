import { TestBed } from '@angular/core/testing';

import { BibliotecaServiceService } from './biblioteca-service.service';

describe('BibliotecaServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BibliotecaServiceService = TestBed.get(BibliotecaServiceService);
    expect(service).toBeTruthy();
  });
});
