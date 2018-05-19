import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  NgForm,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder
} from '@angular/forms';
import { IBugdetails } from '../interfaces/bugdetails';
import { IBugcomments } from '../interfaces/bugcomments';
import { BugserviceService } from '../services/bugservice.service';
import { Bugdetails } from '../classes/bugdetails';
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

  bugForm: FormGroup;

  titleFormControlErrorMessage = '';
  titleFormControlValidationMessages = {
    required: 'The title is required',
    minlength: 'The minlength is 3 characters'
  };

  constructor(
    private bugservice: BugserviceService,
    private routeservice: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.bugForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      reporter: ['', Validators.required],
      status: [''],
      comments: this.fb.array([])
    });

    this.route.params.subscribe(p => {
      const controlComments = <FormArray>this.bugForm.controls['comments'];
      if (p.id !== 'new') {
        this.formStatus = 'edit';
        this.bugservice.getBugById(p.id).subscribe(data => {
          data.comments.forEach(item =>
            controlComments.push(
              this.fb.group({
                description: [item.description, Validators.required],
                reporter: [item.reporter, Validators.required]
              })
            )
          );

          this.bugForm.setValue({
            title: data.title,
            description: data.description,
            priority: data.priority,
            reporter: data.reporter,
            status: data.status ? data.status : 'Unknown',
            comments: controlComments.value
          });
          this.model = data;
        });
      } else {
        this.formStatus = 'create';
        controlComments.controls.length = 0;
        this.bugForm.setValue({
          title: '',
          description: '',
          priority: '',
          reporter: '',
          status: '',
          comments: []
        });
      }
    });

    this.bugForm.get('title').valueChanges.subscribe((value: string) => {
      this.titleFormControlErrorMessage = '';

      if (
        (this.bugForm.get('title').touched ||
          this.bugForm.get('title').dirty) &&
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
      this.model.comments = value.comments;

      this.bugservice.updateBug(this.model).subscribe();
    }
    this.returnToList();
  }

  addComment() {
    const control = <FormArray>this.bugForm.controls['comments'];
    control.push(
      this.fb.group({
        description: ['', Validators.required],
        reporter: ['', Validators.required]
      })
    );
  }

  removeComment(index: number) {
    const control = <FormArray>this.bugForm.controls['comments'];
    control.removeAt(index);
  }

  returnToList() {
    this.routeservice.navigate(['./bugs']);
  }
}
