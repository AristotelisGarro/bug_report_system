import { Injectable } from '@angular/core';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BugformComponent } from '../../feature/bugs/bugform/bugform.component';

@Injectable()
export class DirtyBugFormGuard implements CanDeactivate<BugformComponent> {
  canDeactivate(
    component: BugformComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (component.bugForm.dirty) {
      return window.confirm('You will loose changes if you leave the page!');
    }

    return true;
  }
}
