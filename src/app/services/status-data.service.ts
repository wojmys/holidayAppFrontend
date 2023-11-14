import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class StatusDataService {

  statusList:  Array <string> = ['in progress', 'approved', 'declined'];

  constructor() { }

  getStatus(): Array<string>{
    return this.statusList;
  }
}
