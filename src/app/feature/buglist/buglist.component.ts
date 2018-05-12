import { Component, OnInit } from '@angular/core';
import { IBugdetails } from '../../interfaces/bugdetails';
import { BugserviceService } from '../../services/bugservice.service';

@Component({
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
    this.bugService.getBugs().subscribe((data) => {
      this.totalBugs = data.length;
      this.getBugs();
      console.table(this.bugs);
    });
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
