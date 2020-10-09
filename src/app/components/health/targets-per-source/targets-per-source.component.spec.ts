import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetsPerSourceComponent } from './targets-per-source.component';

describe('TargetsPerSourceComponent', () => {
  let component: TargetsPerSourceComponent;
  let fixture: ComponentFixture<TargetsPerSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetsPerSourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetsPerSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
