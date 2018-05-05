/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BugformComponent } from './bugform.component';

describe('BugformComponent', () => {
  let component: BugformComponent;
  let fixture: ComponentFixture<BugformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BugformComponent ]
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
});
