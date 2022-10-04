import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIncomeComponent } from './create-income.component';

describe('CreateIncomeComponent', () => {
  let component: CreateIncomeComponent;
  let fixture: ComponentFixture<CreateIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateIncomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
