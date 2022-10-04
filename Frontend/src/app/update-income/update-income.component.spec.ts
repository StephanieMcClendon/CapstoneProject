import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIncomeComponent } from './update-income.component';

describe('UpdateIncomeComponent', () => {
  let component: UpdateIncomeComponent;
  let fixture: ComponentFixture<UpdateIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateIncomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
