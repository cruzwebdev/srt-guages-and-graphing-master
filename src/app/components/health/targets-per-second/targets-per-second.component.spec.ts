import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetsPerSecondComponent } from './targets-per-second.component';

describe('TargetsPerSecondComponent', () => {
  let component: TargetsPerSecondComponent;
  let fixture: ComponentFixture<TargetsPerSecondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetsPerSecondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetsPerSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
