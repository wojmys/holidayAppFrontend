import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { EmployeeDataService } from '../services/employee-data.service';
import { VacationDataService } from '../services/vacation-data.service';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.scss'
})
export class CreateEmployeeComponent {

  checkoutForm = this.formBuilder.group({
    // username: FormControl<string>,
    // totalHolidays: FormControl<Number>
    username: '',
    totalHolidays: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private dataservice: EmployeeDataService,
    
    ) {}



  onSave() {
    console.info("On Save clicked");
    console.info(this.checkoutForm.value)
    this.dataservice.addEmployee({
      name: this.checkoutForm.value.username!,
      totalHolidays: +this.checkoutForm.value.totalHolidays!,
      remainingHolidays: 30,
      bookingIds: [],
      substitutionsId: []
    })
 
  }

}
