import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Status } from '../interfaces/status';


@Injectable({
  providedIn: 'root'
})
export class StatusDataService {
  

  statusesList : Subject<Status[]> = new Subject<Status[]>();

/*   statusList:  Array <string> = [   'APPROVED',
    'REJECTED',
    'IN_PROGRESS'
  ]; */

  constructor( private http: HttpClient) { 
    this.refreshStatuses()
  }

  getStatuses(): Observable<Array<Status>> {
   
    return this.http.get<Status[]>('http://localhost:8080/api/status')
    
  }
  getStatus(id: Number) : Observable<Status> {
   
     return this.http.get<Status>('http://localhost:8080/api/status/' + id)
   
   }

  addStatus(status: Status) : Observable<any> {
   
    console.info(this.statusesList)
    return this.http.post('http://localhost:8080/api/status', status)
   }
 
   updateStatus(status: Status) : Observable<any> {
   
    console.info(this.statusesList)
    return this.http.put('http://localhost:8080/api/status/' + status.id!, status)
   }
 
  refreshStatuses() {
    this.http.get<Status[]>('http://localhost:8080/api/status').subscribe(value => {
    
      this.statusesList.next(value)
    });
 /*  getStatus(): Array<string>{
    return this.statusList;
  } */
}
}
