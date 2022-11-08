import { TestBed } from '@angular/core/testing';

import { LigneLivraisonService } from './ligne-livraison.service';

describe('LigneLivraisonService', () => {
  let service: LigneLivraisonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LigneLivraisonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
