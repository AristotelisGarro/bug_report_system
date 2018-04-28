import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  private ENDPOINT = 'http://localhost:3001/bugs';

  constructor(private http: HttpClient) { }

  getBugs(): Observable<Bug[]> {
    return this.http.get<Bug[]>(this.ENDPOINT);
  }

}
