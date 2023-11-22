import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDataService } from '../services/employee-data.service';
import { Employee } from '../interfaces/employee';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-employees',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-employees.component.html',
  styleUrl: './list-employees.component.scss',
})
export class ListEmployeesComponent {

  listOfEmployees: Employee[] = [];
  constructor(
    private dataservice: EmployeeDataService,
    private http: HttpClient
  ) {
    // dataservice.getEmployees().subscribe(value => this.listOfEmployees = value);
    dataservice.employees.subscribe((value) => {
      //console.log("Component subscribe ", value);
      this.listOfEmployees = value;
    });
    dataservice.refreshEmployees();
  }

  deleteEmployee(employeeId: Number) {
    this.http
      .delete('http://localhost:8080/api/employee/' + employeeId)
      .subscribe(() => {
        this.dataservice.refreshEmployees();
      });
  }

  confirmDeleteEmployee(employeeId: Number): void {
    const isConfirmed = window.confirm('Do you really want to delete this employee?');

    if (isConfirmed) {
      this.deleteEmployee(employeeId);
    }
  }
}

