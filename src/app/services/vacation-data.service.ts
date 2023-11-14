import { Injectable } from '@angular/core';
import { Vacation } from '../interfaces/vacation';

@Injectable({
  providedIn: 'root'
})
export class VacationDataService {


  vacations : Array<Vacation>= [
    // {
    //   id: 5,
    //   startDate: "13.11.2023",
    //   endDate: "14.11.2023",
    //   quantityDays: 2,
    //   status: "In progress",
    //   employee: "Joe Doe",
    //   substitution: "Jane Doe"
    // }
  ];


  constructor() { }

  addVacation(vacation: Vacation) {
    this.vacations.push(vacation)
    console.info(this.vacations)
  }

  getVacations() : Array<Vacation> {
    console.info(this.vacations);
    return this.vacations;
  }
}
