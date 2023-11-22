import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EmployeeDataService } from '../services/employee-data.service';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../interfaces/employee';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss'
})
export class EditEmployeeComponent {

  checkoutForm = this.formBuilder.group({
    username: '',
    totalHolidays: ''
  });

  currentEmployee: Employee | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private dataservice: EmployeeDataService,
    private employeeDataService: EmployeeDataService,
    private route: ActivatedRoute) {
    //  this.employeeDataService.getEmployees().subscribe(value => this.listOfEmployees = value)

      const routeParams = this.route.snapshot.paramMap;
      const employeeId = Number(routeParams.get('id'));
      employeeDataService.getEmployee(employeeId).subscribe(employee => {
        this.currentEmployee = employee;
        this.checkoutForm.patchValue({
          username: employee.name,
          totalHolidays: employee.totalHolidays+''});
        console.log(employee)
      });
      console.log(employeeId)
    }
  
    onSave() {
      
  /*   console.info("On Save clicked");
    console.info(this.checkoutForm.value) */
    let employee : Employee = {
      id: +this.currentEmployee?.id!,
      name: this.checkoutForm.value.username!,
      totalHolidays: +this.checkoutForm.value.totalHolidays!,
      remainingHolidays: +this.checkoutForm.value.totalHolidays!,
      bookingIds: this.currentEmployee!.bookingIds,
      substitutionsId: this.currentEmployee!.substitutionsId,
    };
      this.dataservice.updateEmployee(employee).subscribe(
        value => {
          this.dataservice.refreshEmployees();
      }
      
    );
      

  }
    
}
