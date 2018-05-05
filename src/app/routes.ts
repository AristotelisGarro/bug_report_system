import { Routes } from '@angular/router';
import { BuglistComponent } from './buglist/buglist.component';
import { BugformComponent } from './bugform/bugform.component';

export const routes: Routes = [
  {path: '', redirectTo: 'bugs', pathMatch: 'full'},
  {path: 'bugs', component: BuglistComponent},
  {path: 'bug', component: BugformComponent}
   ];
