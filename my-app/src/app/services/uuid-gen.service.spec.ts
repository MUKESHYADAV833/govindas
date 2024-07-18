import { TestBed } from '@angular/core/testing';

import { UuidGenService } from './uuid-gen.service';

describe('UuidGenService', () => {
  let service: UuidGenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UuidGenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
