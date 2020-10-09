import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkTrafficComponent } from './network-traffic.component';

describe('NetworkTrafficComponent', () => {
  let component: NetworkTrafficComponent;
  let fixture: ComponentFixture<NetworkTrafficComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkTrafficComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkTrafficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
