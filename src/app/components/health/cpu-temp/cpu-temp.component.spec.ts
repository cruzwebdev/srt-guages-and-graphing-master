import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpuTempComponent } from './cpu-temp.component';

describe('CpuTempComponent', () => {
  let component: CpuTempComponent;
  let fixture: ComponentFixture<CpuTempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpuTempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpuTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
