import { TestBed } from '@angular/core/testing';

import { SensorStationService } from './sensor-station.service';

describe('SensorStationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SensorStationService = TestBed.get(SensorStationService);
    expect(service).toBeTruthy();
  });
});
