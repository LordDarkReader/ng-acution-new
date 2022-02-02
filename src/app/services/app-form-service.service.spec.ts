import { TestBed } from '@angular/core/testing';

import { AppFormServiceService } from './app-form-service.service';

describe('AppFormServiceService', () => {
  let service: AppFormServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppFormServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
