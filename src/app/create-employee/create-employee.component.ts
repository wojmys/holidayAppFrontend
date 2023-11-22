import { Component, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { EmployeeDataService } from '../services/employee-data.service';
import { VacationDataService } from '../services/vacation-data.service';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../interfaces/employee';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.scss',
})
export class CreateEmployeeComponent {

  checkoutForm = this.formBuilder.group({
    username: '',
    totalHolidays: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private dataservice: EmployeeDataService,
    private employeeDataService: EmployeeDataService,) {
    //  this.employeeDataService.getEmployees().subscribe(value => this.listOfEmployees = value)
    }
  
    onSave() {
      
  /*   console.info("On Save clicked");
    console.info(this.checkoutForm.value) */
    let employee = {
      name: this.checkoutForm.value.username!,
      totalHolidays: +this.checkoutForm.value.totalHolidays!,
      remainingHolidays: +this.checkoutForm.value.totalHolidays!,
      bookingIds: [],
      substitutionsId: []
    };
      this.dataservice.addEmployee(employee).subscribe(
        value => {
          this.dataservice.refreshEmployees();
      }
      
    );
    // this.myEventEmitter.emit(employee)
 


    // this.doStep1();
    // this.doStep2();
    // this.doStep3();

    // this.doStep1().subscribe(
    //   this.doStep2().subscribe(
    //     this.doStep3().subscribe(

    //     )
    //   )
    // )


  }
    
}
