import { TestBed } from '@angular/core/testing';

import { VacationDataService } from './vacation-data.service';

describe('VacationService', () => {
  let service: VacationDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacationDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
