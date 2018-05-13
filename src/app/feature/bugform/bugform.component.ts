import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { IBugdetails } from '../../interfaces/bugdetails';
import { BugserviceService } from '../../services/bugservice.service';
import { Bugdetails } from '../../classes/bugdetails';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'brs-bugform',
  templateUrl: './bugform.component.html',
  styleUrls: ['./bugform.component.scss']
})
export class BugformComponent implements OnInit {
  formStatus = 'create';
  model: IBugdetails;
  priorities = [
    { id: '', value: 'Select' },
    { id: 1, value: 'Minor' },
    { id: 2, value: 'Major' },
    { id: 3, value: 'Critical' }
  ];
  reporters = ['QA', 'PO', 'DEV'];
  statuses = ['Ready for test', 'Done', 'Rejected'];
  showValidations = false;

  bugForm: FormGroup;

  titleFormControlErrorMessage = '';
  titleFormControlValidationMessages = {
    required: 'The title is required',
    minlength: 'The minlength is 3 characters'
  };

  constructor(
    private bugservice: BugserviceService,
    private routeservice: Router,
    private route: ActivatedRoute
  ) {  }

  ngOnInit() {
    this.bugForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      description: new FormControl('', Validators.required),
      priority: new FormControl('', Validators.required),
      reporter: new FormControl('', Validators.required),
      status: new FormControl('')
    });

    this.route.params.subscribe(p => {
      if (p.id !== 'new') {
        this.formStatus = 'edit';
        this.bugservice.getBugById(p.id).subscribe(data => {
          this.bugForm.setValue({
            title: data.title,
            description: data.description,
            priority: data.priority,
            reporter: data.reporter,
            status: data.status ? data.status : 'Unknown'
          });
          this.model = data;
        });
      } else {
        this.formStatus = 'create';
        this.bugForm.setValue({
          title: '',
          description: '',
          priority: '',
          reporter: '',
          status: ''
        });
      }
    });

    this.bugForm.get('title').valueChanges.subscribe((value: string) => {
      this.titleFormControlErrorMessage = '';

      if (
        (this.bugForm.get('title').touched || this.bugForm.get('title').dirty) &&
        this.bugForm.get('title').errors
      ) {
        this.titleFormControlErrorMessage = Object.keys(
          this.bugForm.get('title').errors
        )
          .map(c => this.titleFormControlValidationMessages[c])
          .join(' ');
      }
    });

    this.bugForm.get('reporter').valueChanges.subscribe((value: string) => {
      const statusFormControl = this.bugForm.get('status');
      if (value === 'QA') {
        statusFormControl.setValidators([Validators.required]);
      } else {
        statusFormControl.clearValidators();
      }
      statusFormControl.updateValueAndValidity();
    });
  }

  formSubmit({ value }: { value }) {
    console.log(value);
    if (this.bugForm.invalid) {
      this.showValidations = true;
      return;
    }
    if (this.formStatus === 'create') {
    this.bugservice.createBug(value).subscribe();
    } else {
      this.model.description = value.description;
      this.model.title = value.title;
      this.model.priority = value.priority;
      this.model.reporter = value.reporter;
      this.model.status = value.status;
    this.bugservice.updateBug(this.model).subscribe();
    }
    this.routeservice.navigate(['./bugs']);
  }
}
