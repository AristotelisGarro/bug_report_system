import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bugdetails } from './bugdetails';
import { Observable } from 'rxjs/Observable';
import {map} from 'rxjs/operator/map';

@Injectable()
export class BugserviceService {

  ENDPOINT = 'http://localhost:3001/';
bugs: Bugdetails[];

constructor(private http: HttpClient) { }
  getBugs(): Observable<Array<Bugdetails>> {
    return this.http.get<Array<Bugdetails>>(this.ENDPOINT + 'bugs');
  }
}
