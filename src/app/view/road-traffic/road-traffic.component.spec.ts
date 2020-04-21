import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadTrafficComponent } from './road-traffic.component';

describe('RoadTrafficComponent', () => {
  let component: RoadTrafficComponent;
  let fixture: ComponentFixture<RoadTrafficComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadTrafficComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadTrafficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
