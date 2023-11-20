import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class StatusDataService {

  statusList:  Array <string> = [   'APPROVED',
    'REJECTED',
    'IN_PROGRESS'
  ];

  constructor() { }

  getStatus(): Array<string>{
    return this.statusList;
  }
}
