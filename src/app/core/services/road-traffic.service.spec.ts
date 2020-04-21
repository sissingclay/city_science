import { TestBed } from '@angular/core/testing';

import { RoadTrafficService } from './road-traffic.service';

describe('RoadTrafficService', () => {
  let service: RoadTrafficService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoadTrafficService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
