import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdvancedSearch } from '../classes/advanced-search.model';

@Component({
  selector: 'brs-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent implements OnInit {
  @Output() searched: EventEmitter<AdvancedSearch> = new EventEmitter<AdvancedSearch>();
  priorities = [
    { id: '', value: 'Priorities' },
    { id: 1, value: 'Minor' },
    { id: 2, value: 'Major' },
    { id: 3, value: 'Critical' }
  ];
  reporters = ['QA', 'PO', 'DEV'];
  statuses = ['Ready for test', 'Done', 'Rejected'];
  model: AdvancedSearch ;

  constructor() {
    this.model = new AdvancedSearch();
   }

  ngOnInit() {
  }


  search(form: NgForm) {
    this.searched.emit(form.value);
  }

  clearFilters() {
    this.model = new AdvancedSearch();
    this.searched.emit(this.model);
  }
}
