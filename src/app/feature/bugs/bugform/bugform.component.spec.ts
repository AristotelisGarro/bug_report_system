/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BugformComponent } from './bugform.component';
import { BugserviceService } from '../services/bugservice.service';
import { SharedModule } from '../../../shared/shared.module';
import { MockBugserviceService } from '../services/mock.bugservice.service';

fdescribe('BugformComponent', () => {
  let component: BugformComponent;
  let fixture: ComponentFixture<BugformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule.withRoutes([])],
      declarations: [ BugformComponent ],
      providers: [
        {
          provide: BugserviceService,
          useClass: MockBugserviceService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate empty form', () => {
    expect(component.bugForm.valid).toBeFalsy();
  });

  it('validate form with minimum required fields', () => {
    const titleControl = component.bugForm.get('title');
    const priorityControl = component.bugForm.get('priority');
    const reporterControl = component.bugForm.get('reporter');
    const descriptionControl = component.bugForm.get('description');

    titleControl.setValue('Bug Title');
    priorityControl.setValue(1);
    reporterControl.setValue('PO');
    descriptionControl.setValue('Bug Description');

    expect(component.bugForm.valid).toBeTruthy();
  });

  it('validate form with qa as reporter', () => {
    const titleControl = component.bugForm.get('title');
    const priorityControl = component.bugForm.get('priority');
    const reporterControl = component.bugForm.get('reporter');
    const descriptionControl = component.bugForm.get('description');

    titleControl.setValue('Bug Title');
    priorityControl.setValue(1);
    reporterControl.setValue('QA');
    descriptionControl.setValue('Bug Description');

    expect(component.bugForm.valid).toBeFalsy();
  });

  it('validate form with qa as reporter with status', () => {
    const titleControl = component.bugForm.get('title');
    const priorityControl = component.bugForm.get('priority');
    const reporterControl = component.bugForm.get('reporter');
    const descriptionControl = component.bugForm.get('description');
    const statusControl = component.bugForm.get('status');

    titleControl.setValue('Bug Title');
    priorityControl.setValue(1);
    reporterControl.setValue('QA');
    descriptionControl.setValue('Bug Description');
    statusControl.setValue('Done');

    expect(component.bugForm.valid).toBeTruthy();
  });
});
