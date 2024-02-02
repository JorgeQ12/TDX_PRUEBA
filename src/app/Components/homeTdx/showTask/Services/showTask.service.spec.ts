/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ShowTaskService } from './showTask.service';

describe('Service: ShowTask', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowTaskService]
    });
  });

  it('should ...', inject([ShowTaskService], (service: ShowTaskService) => {
    expect(service).toBeTruthy();
  }));
});
