/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UtilityServiceService } from './utilityService.service';

describe('Service: UtilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilityServiceService]
    });
  });

  it('should ...', inject([UtilityServiceService], (service: UtilityServiceService) => {
    expect(service).toBeTruthy();
  }));
});
