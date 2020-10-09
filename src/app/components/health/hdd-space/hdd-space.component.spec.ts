import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HddSpaceComponent } from './hdd-space.component';

describe('HddSpaceComponent', () => {
  let component: HddSpaceComponent;
  let fixture: ComponentFixture<HddSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HddSpaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HddSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
