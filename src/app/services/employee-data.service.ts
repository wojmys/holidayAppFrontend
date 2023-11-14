import { Injectable } from '@angular/core';
import { Employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {


  employees : Array<Employee> = [/* {
    id: 5,
    name: "Hallo",
    totalHolidays: 30,
    remainingHolidays: 30,
    bookingIds: [],
    substitutionsId: []
  },{
    id: 10,
    name: "User2",
    totalHolidays: 30,
    remainingHolidays: 30,
    bookingIds: [],
    substitutionsId: []
  } */]

  constructor() { }


  addEmployee(employee: Employee) {
    this.employees.push(employee)
    console.info(this.employees)
  }

  getEmployees() : Array<Employee> {
    console.info(this.employees);
    return this.employees;
  }

}
