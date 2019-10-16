import { TestBed } from '@angular/core/testing';

import { LokaalserviceService } from './lokaalservice.service';

describe('LokaalserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LokaalserviceService = TestBed.get(LokaalserviceService);
    expect(service).toBeTruthy();
  });
});
