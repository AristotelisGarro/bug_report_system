import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugformComponent } from './bugform/bugform.component';
import { BuglistComponent } from './buglist/buglist.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { BugserviceService } from './services/bugservice.service';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    BugformComponent,
    BuglistComponent,
    AdvancedSearchComponent
],
  exports: [
    BugformComponent,
    BuglistComponent
  ],
  providers: [BugserviceService]
})
export class BugsModule { }
