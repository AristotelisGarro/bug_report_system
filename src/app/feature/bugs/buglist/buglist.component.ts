import { Component, OnInit, OnDestroy } from '@angular/core';
import { IBugdetails } from '../interfaces/bugdetails';
import { BugserviceService } from '../services/bugservice.service';
import { AdvancedSearch } from '../classes/advanced-search.model';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'brs-buglist',
  templateUrl: './buglist.component.html',
  styleUrls: ['./buglist.component.scss']
})
export class BuglistComponent implements OnInit, OnDestroy {
  private subscriptions: ISubscription[] = [];
  bugs: IBugdetails[];
  asc = true;
  sortedColumn: string;
  page = 0;
  pagesize = 10;
  totalpages = 1;
  totalpagesArray = [0];
  totalBugs: number;
  filters: AdvancedSearch;

  constructor(private bugService: BugserviceService) {  }

  ngOnInit() {
    this.filters = new AdvancedSearch();
    this.getBugs();
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

  priorityClass(priority: number): string {
    switch (priority) {
      case 1:
        return 'badge-info';
      case 2:
        return 'badge-warning';
      case 3:
        return 'badge-danger';
      default:
        return '';
    }
  }

  getBugs() {
    const direction = this.asc ? 'asc' : 'desc';
    // tslint:disable-next-line:max-line-length
    this.subscriptions.push(this.bugService.getBugsSorted(this.sortedColumn, direction, this.page, this.pagesize, this.filters).subscribe((data) => {
      this.bugs = data.body;
      // tslint:disable-next-line:radix
      const totalBugsHeader = parseInt(data.headers.get('totalRecords'));
      this.totalBugs = isNaN(totalBugsHeader) ? this.bugs.length : totalBugsHeader;
      this.totalpages = Math.ceil( this.totalBugs / this.pagesize );
      this.totalpagesArray = Array(this.totalpages || 1).fill(this.totalpages || 1).map((x, i) => i);
    }));
  }

  sortBy(column) {
    this.sortedColumn = column;
    this.getBugs();
    this.asc = !this.asc;
  }

  onSearch(data: AdvancedSearch) {
    this.filters = data;
    this.getBugs();
  }

  deleteBug(bug: IBugdetails) {
    if (window.confirm('Are you sure you want to delete \r\n' + bug.title + '?')) {
      this.subscriptions.push(this.bugService.deleteBug(bug.id).subscribe(() => this.getBugs()));
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((value) => {
      value.unsubscribe();
    });
  }

}
