import { TestBed } from '@angular/core/testing';

import { SharyBackendService } from './shary-backend.service';

describe('SharyBackendService', () => {
  let service: SharyBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharyBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
