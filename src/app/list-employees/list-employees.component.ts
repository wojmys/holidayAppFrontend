import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDataService } from '../services/employee-data.service';

@Component({
  selector: 'app-list-employees',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-employees.component.html',
  styleUrl: './list-employees.component.scss'
})
export class ListEmployeesComponent {


  constructor(
    private dataservice: EmployeeDataService) {}


    getEmployees() {
      return this.dataservice.getEmployees()
    }

}
