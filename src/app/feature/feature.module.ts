import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugformComponent } from './bugform/bugform.component';
import { BuglistComponent } from './buglist/buglist.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { routes } from '../routes';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    BugformComponent,
    BuglistComponent
  ],
  exports: [
    BugformComponent,
    BuglistComponent
  ]
})
export class FeatureModule { }
