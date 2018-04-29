import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bugdetails } from './bugdetails';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BugserviceService {

  ENDPOINT = 'http://localhost:3001/';
bugs: Bugdetails[];

constructor(private http: HttpClient) { }
  getBugs() {
     this.http.get(this.ENDPOINT + 'bugs').subscribe(
       (response: Bugdetails[]) => {
         this.bugs = response;
       }
     );
     return this.bugs;
  }
}
