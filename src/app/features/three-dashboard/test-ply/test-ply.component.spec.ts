import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPlyComponent } from './test-ply.component';

describe('TestPlyComponent', () => {
  let component: TestPlyComponent;
  let fixture: ComponentFixture<TestPlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestPlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
