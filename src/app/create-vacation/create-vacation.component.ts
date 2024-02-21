import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { VacationDataService } from '../services/vacation-data.service';
import { EmployeeDataService } from '../services/employee-data.service';
import { StatusDataService } from '../services/status-data.service';
import { Employee } from '../interfaces/employee';
import { VacationDTO } from '../interfaces/vacation-dto';
import { Status } from '../interfaces/status';


@Component({
  selector: 'app-create-vacation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-vacation.component.html',
  styleUrl: './create-vacation.component.scss'
})
export class CreateVacationComponent {

  checkoutForm = this.formBuilder.group({
    
    startDate: '',
    endDate: '',
    quantityDays:'',
    status:-1,
    employee: -1,
    substitution: -1
  });

  listOfEmployees : Array<Employee> = [];
  listOfStatuses: Array<Status>=[];

  constructor(
    private formBuilder: FormBuilder,
    private dataservice: VacationDataService,
    private employeeDataService: EmployeeDataService,
    private statusDataService: StatusDataService
    ) {
      //this.listOfEmployees = employeeDataService.getEmployees();
      employeeDataService.employees.subscribe(value =>{
        
        this.listOfEmployees = value;
        console.log("CreateVacationComponent: ", value);
        
       } )
       employeeDataService.refreshEmployees();
       
      
      statusDataService.statusesList.subscribe(value=>{
        this.listOfStatuses=value;
        console.log("StatusList: ", value);
      })
      statusDataService.refreshStatuses();
  
    }

  onSave() {
    let vacation : VacationDTO = {
      startDate: this.checkoutForm.value.startDate!,
      endDate: this.checkoutForm.value.endDate!,
/*       quantityDays: +this.checkoutForm.value.quantityDays!, */
      quantityDays: +this.calculateDuration(),
      statusId: this.checkoutForm.value.status!,
      employeeId: this.checkoutForm.value.employee!,
      substitutionId:this.checkoutForm.value.substitution!
    }
    console.log(vacation);
    this.dataservice.addVacation(vacation).subscribe(
      value => {
        this.dataservice.refreshVacations();
      }
    );
  }

  
  onStartDateChanged() {
    console.info("Date changed to " + this.checkoutForm.value.startDate!)
    // this.checkoutForm.value.quantityDays = this.checkoutForm.value.startDate!
  }

  onEndDateChanged(){

    this.checkoutForm.patchValue({
      quantityDays : this.calculateDuration()+''
    })
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
     return difference+1;
   
    } else {
      console.error('Invalid input');
      return 0;
    }
    
  }
}


