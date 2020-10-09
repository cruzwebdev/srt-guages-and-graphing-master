import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthPageComponent } from './health-page.component';

describe('HealthPageComponent', () => {
  let component: HealthPageComponent;
  let fixture: ComponentFixture<HealthPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
