import { Component, OnInit } from '@angular/core';
import { IBugdetails } from '../interfaces/bugdetails';
import { Bugdetails } from '../classes/bugdetails';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BugserviceService } from '../services/bugservice.service';
import { Router } from '@angular/router';

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

  bugForm: FormGroup;

  constructor(private bugservice: BugserviceService, private router: Router) {}

  ngOnInit() {
    this.model = new Bugdetails(null, null, null, null, null, null, null);

    this.bugForm = new FormGroup({
      title: new FormControl(this.model.title, Validators.required),
      description: new FormControl(this.model.description, Validators.required),
      priority: new FormControl(this.model.priority, Validators.required),
      reporter: new FormControl(this.model.reporter, Validators.required),
      status: new FormControl(this.model.status)
    });

    this.bugForm.get('reporter').valueChanges.subscribe(val => {
      const statusFormControl = this.bugForm.controls.status;

      if (val === 'QA') {
        statusFormControl.setValidators(Validators.required);
      } else {
        statusFormControl.clearValidators();
      }
      statusFormControl.updateValueAndValidity();
    });

  }

  formSubmit ({value}: {value}) {
    console.log(value);
    if (this.bugForm.invalid) {
      this.showValidations = true;
      return;
    }
    this.bugservice.createBug(value).subscribe();
    this.router.navigate(['./bugs']);
  }

}
