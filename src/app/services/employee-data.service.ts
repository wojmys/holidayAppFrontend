import { Injectable } from '@angular/core';
import { Employee } from '../interfaces/employee';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {

  employees : Subject<Employee[]> = new Subject<Employee[]>();


  constructor( private http: HttpClient) { 
    this.refreshEmployees()
  }

  addEmployee(employee: Employee) : Observable<any> {
   /*  this.employees.push(employee) */
   console.info(this.employees)
   return this.http.post('http://localhost:8080/api/employee', employee)
  }

 
 /*  deleteEmployee(employeeId: number) {
   this.http.delete('http://localhost:8080/api/employee/'+employeeId)
  } */

  getEmployees() : Observable<Array<Employee>> {
   // console.info(this.employees);
    return this.http.get<Employee[]>('http://localhost:8080/api/employee')
    //return this.employees;
  }

  refreshEmployees() {
    this.http.get<Employee[]>('http://localhost:8080/api/employee').subscribe(value => {
     // console.log("refreshEmployees - next: ", value);
      this.employees.next(value)
    });
  }

}
