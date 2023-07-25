import {Injectable} from '@angular/core';
import {DayPilot} from 'daypilot-pro-angular';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import eventsjson from '../../../assets/files/eventData.json'

@Injectable({providedIn: 'root'})
export class DataService {

  resources: DayPilot.ResourceData[] = [
    {
      name: 'Hours', id: 'h', expanded: true, children: [
        {name: '9:00  AM', id: 'H1', capacity: 1},
        {name: '10:00 AM', id: 'H2', capacity: 1},
        {name: '11:00 AM', id: 'H3', capacity: 1},
        {name: '12:00 AM', id: 'H4', capacity: 1},
        {name: '15:00 PM', id: 'H5', capacity: 1},
        {name: '16:00 PM', id: 'H6', capacity: 1},
        {name: '17:00 PM', id: 'H7', capacity: 1},
      ]
    },
    
   
  ];
  

  events: DayPilot.EventData[] = eventsjson;

  constructor(private http: HttpClient) {
  }

  getEvents(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {

    // simulating an HTTP request
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.events);
      }, 200);
    });

    // return this.http.get("/api/events?from=" + from.toString() + "&to=" + to.toString());
  }

  getResources(): Observable<any[]> {

    // simulating an HTTP request
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.resources);
      }, 200);
    });

    // return this.http.get("/api/resources");
  }
  writeData(data: any) {
    /* const url = '../../../assets/files/eventData.json';
    return this.http.put(url, data); */
    const fs = require('fs');
    const filepath = '../../../assets/files/eventData.json';
    var datafile = JSON.parse(fs.readFileSync(filepath));
    fs.writeFileSync(filepath, JSON.stringify(data));
  }

}
export interface schedulingForm {
  title: string;  
  time:string;
  pickerstartdate: string;
  pickerenddate: string;
} 