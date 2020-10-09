import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorStationPageComponent } from './sensor-station-page.component';

describe('SensorStationPageComponent', () => {
  let component: SensorStationPageComponent;
  let fixture: ComponentFixture<SensorStationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorStationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorStationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
