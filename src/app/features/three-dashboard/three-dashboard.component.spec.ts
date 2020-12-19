import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeDashboardComponent } from './three-dashboard.component';

describe('ThreeDashboardComponent', () => {
  let component: ThreeDashboardComponent;
  let fixture: ComponentFixture<ThreeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
