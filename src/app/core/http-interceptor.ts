// tslint:disable-next-line:max-line-length
import { HttpInterceptor, HttpEvent, HttpHandler, HttpHeaderResponse, HttpProgressEvent, HttpRequest, HttpResponse, HttpSentEvent, HttpUserEvent, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';

export class MyHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any>
   | HttpUserEvent<any>> {
    req = req.clone({setHeaders: {'Authorization': 'code.hub.ng5.token'}});

    return next.handle(req).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        console.log(event.status);
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 403) {
          window.alert('Unauthorized');
        }
      }
    });
  }
}
