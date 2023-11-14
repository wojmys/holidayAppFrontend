import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVacationComponent } from './list-vacation.component';

describe('ListVacationComponent', () => {
  let component: ListVacationComponent;
  let fixture: ComponentFixture<ListVacationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListVacationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListVacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
