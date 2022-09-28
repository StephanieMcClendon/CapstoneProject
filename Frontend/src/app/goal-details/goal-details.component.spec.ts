import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalDetailsComponent } from './goal-details.component';

describe('GoalDetailsComponent', () => {
  let component: GoalDetailsComponent;
  let fixture: ComponentFixture<GoalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
