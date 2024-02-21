import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { StatusDataService } from '../services/status-data.service';
import { VacationDataService } from '../services/vacation-data.service';

@Component({
  selector: 'app-create-status',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-status.component.html',
  styleUrl: './create-status.component.scss'
})
export class CreateStatusComponent {

    checkoutForm = this.formBuilder.group({
    name: '',
    bookings:[]
  });
  
  constructor(
    private formBuilder: FormBuilder,
    private dataService: StatusDataService,
  ){

  }

  onSave() {
      
    /*   console.info("On Save clicked");
      console.info(this.checkoutForm.value) */
      let status = {
        name: this.checkoutForm.value.name!,
        bookings: [],
        
      };
        this.dataService.addStatus(status).subscribe(
          value => {
            this.dataService.refreshStatuses();
        }
      );
    }

}
