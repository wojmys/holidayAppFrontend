import { Routes } from '@angular/router';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ListEmployeesComponent } from './list-employees/list-employees.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { ListVacationComponent } from './list-vacation/list-vacation.component';
import { EditVacationComponent } from './edit-vacation/edit-vacation.component';
import { CreateVacationComponent } from './create-vacation/create-vacation.component';
import { CreateStatusComponent } from './create-status/create-status.component';

export const routes: Routes = [
    { path: 'employees/create', component: CreateEmployeeComponent },
    { path: 'employees/edit/:id', component: EditEmployeeComponent },
    { path: 'employees/list', component: ListEmployeesComponent },
    { path: 'vacations/create', component: CreateVacationComponent },
    { path: 'vacations/edit/:id', component: EditVacationComponent },
    { path: 'vacations/list', component: ListVacationComponent },
    { path: 'status/create', component: CreateStatusComponent },

];
