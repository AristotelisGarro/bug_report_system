import { Component, OnInit } from '@angular/core';
import { IBugdetails } from '../interfaces/bugdetails';
import { BugserviceService } from '../services/bugservice.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'brs-buglist',
  templateUrl: './buglist.component.html',
  styleUrls: ['./buglist.component.scss']
})
export class BuglistComponent implements OnInit {
  bugs: IBugdetails[];
  asc = true;
  sortedColumn: string;
  page = 0;
  pagesize = 10;
  totalpages = 1;
  totalpagesArray = [0];
  totalBugs: number;

  constructor(private bugService: BugserviceService) { }

  ngOnInit() {
    this.bugService.getTotalBugs().subscribe((data) => {
      this.totalBugs = data.length;
      // this.totalBugs = data.total;
      this.getBugs();
      console.table(this.bugs);
    });
  }

  displayPriority(priority: number): string {
    switch (priority) {
      case 1:
        return 'Minor';
      case 2:
        return 'Major';
      case 3:
        return 'Critical';
      default:
        return '';
    }
  }

  getBugs() {
    const direction = this.asc ? 'asc' : 'desc';
    this.bugService.getBugsSorted(this.sortedColumn, direction, this.page, this.pagesize).subscribe((data) => {
      this.bugs = data;
      this.totalpages = Math.ceil( this.totalBugs / this.pagesize );
      this.totalpagesArray = Array(this.totalpages || 1).fill(this.totalpages || 1).map((x, i) => i);
    });
  }

  sortBy(column) {
    this.sortedColumn = column;
    this.getBugs();
    this.asc = !this.asc;
  }

}
