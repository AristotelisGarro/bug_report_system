import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IBugdetails } from '../interfaces/bugdetails';
import 'rxjs/add/observable/of';

@Injectable()
export class MockBugserviceService {

  constructor() {}
  getBugById(id: string): Observable<IBugdetails> {
    return Observable.of();
  }
}
