import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';
import { Bugdetails } from '../classes/bugdetails';
import { IBugdetails } from '../interfaces/bugdetails';
import { AdvancedSearch } from '../classes/advanced-search.model';

@Injectable()
export class BugserviceService {
  ENDPOINT = 'http://localhost:3001/';
  bugs: IBugdetails[];

  constructor(private http: HttpClient) {}
  getBugs(): Observable<Array<IBugdetails>> {
    return this.http.get<Array<IBugdetails>>(this.ENDPOINT + 'bugs');
  }

  getBugsSorted(column: string, asc: string, page: number, size: number, filters: AdvancedSearch)
  : Observable<HttpResponse<any>> {
    return this.http.get<any>(this.ENDPOINT + 'bugs?sort=' + column + ',' + asc + '&page=' + page + '&size=' +
     size + '&title=' + filters.title + '&priority=' + filters.priority + '&status=' + filters.status + '&reporter=' + filters.reporter,
    {observe: 'response'});
  }

  getBugById(id: string): Observable<IBugdetails> {
    return this.http.get<IBugdetails>(this.ENDPOINT + 'bugs/' + id);
  }

  createBug(data: IBugdetails) {
    return this.http.post(this.ENDPOINT + 'bugs', data);
  }

  updateBug(data: IBugdetails) {
    return this.http.put(this.ENDPOINT + 'bugs/' + data.id, data);
  }

  deleteBug(id: string) {
    return this.http.delete(this.ENDPOINT + 'bugs/' + id);
  }
}
