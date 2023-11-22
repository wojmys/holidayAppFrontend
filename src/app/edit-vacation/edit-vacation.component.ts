import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../interfaces/employee';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { VacationDTO } from '../interfaces/vacation-dto';
import { EmployeeDataService } from '../services/employee-data.service';
import { StatusDataService } from '../services/status-data.service';
import { VacationDataService } from '../services/vacation-data.service';
import { ActivatedRoute } from '@angular/router';
import { Vacation } from '../interfaces/vacation';

@Component({
  selector: 'app-edit-vacation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-vacation.component.html',
  styleUrl: './edit-vacation.component.scss',
})
export class EditVacationComponent {
  checkoutForm = this.formBuilder.group({
    startDate: '',
    endDate: '',
    quantityDays: '',
    status: '',
    employee: -1,
    substitution: -1,
  });

  listOfEmployees: Array<Employee> = [];
  listOfStatuses: Array<string>=[];
  currentVacation: VacationDTO | undefined ;

  constructor(
    private formBuilder: FormBuilder,
    private dataservice: VacationDataService,
    private employeeDataService: EmployeeDataService,
    private statusDataService: StatusDataService,
    private route: ActivatedRoute) {

    //this.listOfEmployees = employeeDataService.getEmployees();
    employeeDataService.employees.subscribe((value) => {
      this.listOfEmployees = value;
      console.log('CreateVacationComponent: ', value);
    });
    const routeParams = this.route.snapshot.paramMap;
    const vacationId = Number(routeParams.get('id'));
    employeeDataService.refreshEmployees();

    dataservice.getVacation(vacationId).subscribe(vacation =>{
      this.currentVacation=vacation;
          this.checkoutForm.patchValue({
            startDate: vacation.startDate!,
            endDate: vacation.endDate!,
            quantityDays:vacation.quantityDays+'',
            status: vacation.status+'',
            employee: +vacation.employeeId,
            substitution: +vacation.substitutionId
    
          })
    });

    statusDataService.statusesList.subscribe(value=>{
      this.listOfStatuses=value;
    });
    statusDataService.refreshStatuses();
    
  }

  onSave() {
    let vacation: VacationDTO = {
      id: +this.currentVacation?.id!,
      startDate: this.checkoutForm.value.startDate!,
      endDate: this.checkoutForm.value.endDate!,
      /*       quantityDays: +this.checkoutForm.value.quantityDays!, */
      quantityDays: +this.calculateDuration(),
      status: this.checkoutForm.value.status!,
      employeeId: +this.checkoutForm.value.employee!,
      substitutionId: +this.checkoutForm.value.substitution!,
    };
    console.log(vacation);
    this.dataservice.updateVacation(vacation).subscribe(value => {
      this.dataservice.refreshVacations();
    });
  }

  onStartDateChanged() {
    console.info('Date changed to ' + this.checkoutForm.value.startDate!);
    // this.checkoutForm.value.quantityDays = this.checkoutForm.value.startDate!
  }

  onEndDateChanged() {
    this.checkoutForm.patchValue({
      quantityDays: this.calculateDuration() + '',
    });
  }

  isValidDateFormat(dateString: string): boolean {
    // format "YYYY-MM-DD"
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    // test pattern
    return dateRegex.test(dateString);
  }

  calculateDuration(): Number {
    let startDate = this.checkoutForm.value.startDate!;
    let endDate = this.checkoutForm.value.endDate!;

    if (this.isValidDateFormat(startDate) && this.isValidDateFormat(endDate)) {
      let start = new Date(Date.parse(startDate));
      let end = new Date(Date.parse(endDate));

      let difference = end.getDate() - start.getDate();
      return difference + 1;
    } else {
      console.error('Invalid input');
      return 0;
    }
  }
}
