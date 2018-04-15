import { TestBed, inject } from '@angular/core/testing';

import { AlgoliaService } from './algolia.service';

describe('AlgoliaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlgoliaService]
    });
  });

  it('should be created', inject([AlgoliaService], (service: AlgoliaService) => {
    expect(service).toBeTruthy();
  }));
});
