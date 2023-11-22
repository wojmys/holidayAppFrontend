import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StatusDataService {
  [x: string]: any;

  statusesList : Subject<string[]> = new Subject<string[]>();

/*   statusList:  Array <string> = [   'APPROVED',
    'REJECTED',
    'IN_PROGRESS'
  ]; */

  constructor( private http: HttpClient) { 
    this.refreshStatuses()
  }

  getStatuses(): Observable<Array<string>> {
   
    return this.http.get<string[]>('http://localhost:8080/api/status');
    
  }
 
  refreshStatuses() {
    this.http.get<string[]>('http://localhost:8080/api/status').subscribe(value => {
    
      this.statusesList.next(value)
    });
 /*  getStatus(): Array<string>{
    return this.statusList;
  } */
}
}
