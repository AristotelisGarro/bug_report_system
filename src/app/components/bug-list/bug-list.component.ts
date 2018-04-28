import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http/http.service';

@Component({
  selector: 'BugReportSystem-bug-list',
  templateUrl: './bug-list.component.html',
  styleUrls: ['./bug-list.component.scss']
})
export class BugListComponent implements OnInit {

  bugs: Bug[];

  constructor(private bugService: HttpService) { }

  ngOnInit() {
    this.bugService.getBugs().subscribe((response) => {
      this.bugs = response;
    });
  }

}
