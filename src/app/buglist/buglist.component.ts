import { Component, OnInit } from '@angular/core';
import { BugserviceService } from '../bugservice.service';
import { Bugdetails } from '../bugdetails';

@Component({
  selector: 'brs-buglist',
  templateUrl: './buglist.component.html',
  styleUrls: ['./buglist.component.scss']
})
export class BuglistComponent implements OnInit {
  bugs: Bugdetails[];

  constructor(private bugService: BugserviceService) { }

  ngOnInit() {
    this.bugService.getBugs().subscribe((data) => {
      this.bugs = data;
      console.table(this.bugs);
    });
  }

}
