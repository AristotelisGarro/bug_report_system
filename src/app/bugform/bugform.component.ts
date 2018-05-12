import { Component, OnInit } from '@angular/core';
import { IBugdetails } from '../interfaces/bugdetails';
import { Bugdetails } from '../classes/bugdetails';
import { NgForm } from '@angular/forms';
import { BugserviceService } from '../services/bugservice.service';

@Component({
  selector: 'brs-bugform',
  templateUrl: './bugform.component.html',
  styleUrls: ['./bugform.component.scss']
})
export class BugformComponent implements OnInit {
  model: IBugdetails;
  statusRequired = false;
  priorities = [{id: 1 , value: 'Minor'}, {id: 2 , value: 'Major'}, {id: 3 , value: 'Critical'}];
  reporters = ['QA', 'PO', 'DEV'];
  statuses = ['Ready for test', 'Done', 'Rejected'];
  showValidations = false;
  constructor(private bugservice: BugserviceService, ) {}

  ngOnInit() {
    this.model = new Bugdetails(null, null, null, null, null, null, null);
  }

  propertyIsValid(value, property) {
    if (property === 'reporter' && value === 'QA') {
      this.statusRequired = true;
    } else if (property === 'status' && value == null) {
      this.statusRequired = true;
    } else {
      this.statusRequired = false;
    }
  }

  formSubmit (form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      this.showValidations = true;
      return;
    }
    this.bugservice.createBug(form.value).subscribe();

  }

}
