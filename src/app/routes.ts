import { Routes } from '@angular/router';
import { BuglistComponent } from './feature/buglist/buglist.component';
import { BugformComponent } from './feature/bugform/bugform.component';

export const routes: Routes = [
  {path: '', redirectTo: 'bugs', pathMatch: 'full'},
  {path: 'bugs', component: BuglistComponent},
  {path: 'bug', component: BugformComponent}
   ];
