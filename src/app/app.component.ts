import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ListEmployeesComponent } from './list-employees/list-employees.component';
import { CreateVacationComponent } from "./create-vacation/create-vacation.component";
import { ListVacationComponent } from "./list-vacation/list-vacation.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [CommonModule,
        RouterOutlet,
        CreateEmployeeComponent,
        ListEmployeesComponent,
        CreateVacationComponent, ListVacationComponent]
})
export class AppComponent {
  title = 'vacation-planner';
}
