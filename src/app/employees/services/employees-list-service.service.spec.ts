import { TestBed } from '@angular/core/testing';

import { EmployeesListServiceService } from './employees-list-service.service';

describe('EmployeesListServiceService', () => {
  let service: EmployeesListServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeesListServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
