import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorStationCurrentComponent } from './sensor-station-current.component';

describe('SensorStationCurrentComponent', () => {
  let component: SensorStationCurrentComponent;
  let fixture: ComponentFixture<SensorStationCurrentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorStationCurrentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorStationCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
