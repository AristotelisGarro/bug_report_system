/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BugserviceService } from './bugservice.service';

describe('Service: Bugservice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BugserviceService]
    });
  });

  it('should ...', inject([BugserviceService], (service: BugserviceService) => {
    expect(service).toBeTruthy();
  }));
});
