/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HomeTdxService } from './homeTdx.service';

describe('Service: HomeTdx', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeTdxService]
    });
  });

  it('should ...', inject([HomeTdxService], (service: HomeTdxService) => {
    expect(service).toBeTruthy();
  }));
});
