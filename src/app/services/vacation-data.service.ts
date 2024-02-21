import { Injectable } from '@angular/core';
import { Vacation } from '../interfaces/vacation';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VacationDTO } from '../interfaces/vacation-dto';
import { Employee } from '../interfaces/employee';
import { Status } from '../interfaces/status';

@Injectable({
  providedIn: 'root',
})
export class VacationDataService {
  /* 
  vacations : Vacation[]=  []; */

  vacations: Subject<Vacation[]> = new Subject<Vacation[]>();

  url = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
    this.refreshVacations();
  }

  addVacation(vacation: VacationDTO): Observable<any> {
    console.log('Vacation created ', vacation)
    return this.http.post(this.url + '/booking', vacation);
  }

  refreshVacations() {
    let newVacations: Vacation[] = [];

    this.http
      .get<VacationDTO[]>(this.url + '/booking')
      .subscribe((valueVacationDTOs) => {
        for (let vacationDto of valueVacationDTOs) {
         // this.http.get<Status>(this.url+'/status/'+vacationDto.status)

          this.http
            .get<Employee>(this.url + '/employee/' + vacationDto.employeeId)
            .subscribe((employee) => {
              this.http.get<Employee>(this.url + '/employee/' + vacationDto.substitutionId)
                .subscribe((substitution) => {

                  this.http.get<Status>(this.url+'/status/'+vacationDto.statusId)
                  .subscribe((status) => {
                    
                  newVacations.push({
                    id: vacationDto.id,
                    startDate: vacationDto.startDate,
                    endDate: vacationDto.endDate,
                    quantityDays: vacationDto.quantityDays,
                    status: status.name,
                    employee: employee.name,
                    substitution: substitution.name,
                  });
                });
                });
            });
        }
        this.vacations.next(newVacations);
      });
  }

  getVacations(): Observable<Array<VacationDTO>> {
    return this.http.get<VacationDTO[]>('http://localhost:8080/api/booking');
  }
  getVacation(id: Number): Observable<VacationDTO> {
    return this.http.get<VacationDTO>(
      'http://localhost:8080/api/booking/' + id
    );
  }
  updateVacation(vacation: VacationDTO): Observable<any> {
    return this.http.put(
      'http://localhost:8080/api/booking/' + vacation.id!, vacation
    );
  }
}
