import { Component, OnInit } from '@angular/core';
import { IBugdetails } from '../interfaces/bugdetails';
import { Bugdetails } from '../classes/bugdetails';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { BugserviceService } from '../services/bugservice.service';

@Component({
  selector: 'brs-bugform',
  templateUrl: './bugform.component.html',
  styleUrls: ['./bugform.component.scss']
})
export class BugformComponent implements OnInit {
  model: IBugdetails;
  priorities = [{id: '', value: 'Select'}, {id: 1 , value: 'Minor'}, {id: 2 , value: 'Major'}, {id: 3 , value: 'Critical'}];
  reporters = ['QA', 'PO', 'DEV'];
  statuses = ['Ready for test', 'Done', 'Rejected'];
  showValidations = false;

  bugForm: FormGroup;

  reporterFormControl = new FormControl('', Validators.required);
  titleFormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  titleFormControlErrorMessage = '';
  titleFormControlValidationMessages = {
    required : 'The title is required',
    minlength: 'The minlength is 3 characters'
  };

  constructor(private bugservice: BugserviceService, ) {}

  ngOnInit() {
    this.model = new Bugdetails(null, null, null, null, null, null, null);
    this.bugForm = new FormGroup({
      title: this.titleFormControl,
      description: new FormControl('', Validators.required),
      priority: new FormControl('', Validators.required),
      reporter: this.reporterFormControl,
      status:  new FormControl()
    });

    this.titleFormControl.valueChanges.subscribe((value: string) => {
      this.titleFormControlErrorMessage = '';

      if ((this.titleFormControl.touched || this.titleFormControl.dirty) && this.titleFormControl.errors) {
        this.titleFormControlErrorMessage =
        Object.keys(this.titleFormControl.errors)
        .map(c => this.titleFormControlValidationMessages[c]).join(" ");
      }
    });

    this.reporterFormControl.valueChanges.subscribe((value: string) => {
      const statusFormControl = this.bugForm.get('status');
      if (value === 'QA') {
        statusFormControl.setValidators(Validators.required);
      } else {
        statusFormControl.clearValidators();
      }
      statusFormControl.updateValueAndValidity();
    });
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
