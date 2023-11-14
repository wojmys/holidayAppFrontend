import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacationDataService } from '../services/vacation-data.service';

@Component({
  selector: 'app-list-vacation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-vacation.component.html',
  styleUrl: './list-vacation.component.scss'
})
export class ListVacationComponent {

  constructor(
    private dataservice: VacationDataService) {}


  getVacations(): any {
    return this.dataservice.getVacations()
}

}
