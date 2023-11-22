import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacationDataService } from '../services/vacation-data.service';
import { Vacation } from '../interfaces/vacation';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-vacation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-vacation.component.html',
  styleUrl: './list-vacation.component.scss',
})
export class ListVacationComponent {
  listOfVacations: Vacation[] = [];

  constructor(
    private dataservice: VacationDataService,
    private http: HttpClient
  ) {
    dataservice.vacations.subscribe((value) => {
      this.listOfVacations = value;
    });
    dataservice.refreshVacations();
  }

  deleteVacation(vacationId: Number) {
    this.http
      .delete('http://localhost:8080/api/booking/' + vacationId)
      .subscribe(() => {
        this.dataservice.refreshVacations();
      });
      console.log('delete id='+vacationId)
  }

  confirmDeleteVacation(vacationId: Number): void {
    const isConfirmed = window.confirm('Do you really want to delete this vacation?');

    if (isConfirmed) {
      this.deleteVacation(vacationId);
    }
  }
}
