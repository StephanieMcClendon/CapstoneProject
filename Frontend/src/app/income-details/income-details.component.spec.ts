import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeDetailsComponent } from './income-details.component';

describe('IncomeDetailsComponent', () => {
  let component: IncomeDetailsComponent;
  let fixture: ComponentFixture<IncomeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
