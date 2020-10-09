import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorStationHistoryComponent } from './sensor-station-history.component';

describe('SensorStationHistoryComponent', () => {
  let component: SensorStationHistoryComponent;
  let fixture: ComponentFixture<SensorStationHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorStationHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorStationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
