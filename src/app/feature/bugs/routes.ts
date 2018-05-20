import { Routes } from '@angular/router';
import { BuglistComponent } from './buglist/buglist.component';
import { BugformComponent } from './bugform/bugform.component';
import { DirtyBugFormGuard } from '../../shared/guards/dirtyform.guard';

export const routes: Routes = [
  {path: 'bugs', component: BuglistComponent},
  {path: 'bug/:id', component: BugformComponent, canDeactivate: [ DirtyBugFormGuard ]}
];
