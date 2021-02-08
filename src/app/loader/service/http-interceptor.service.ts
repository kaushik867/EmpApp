import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { EmployeesListServiceService } from 'src/app/employees/services/employees-list-service.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{
  constructor(private loader: LoaderService, private _http: EmployeesListServiceService) { }
  token;
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    if(localStorage.getItem('token'))
    {
      this.loader.isLoading.next(true);
      this.token = localStorage.getItem('token');
      req = req.clone({
        setHeaders: {
          'Authorization':  this.token,
        },
      });
      return next.handle(req).pipe( 
        finalize(
          ()=>{
            this.loader.isLoading.next(false);
          }
        )  
      )
    }
    return next.handle(req);
  }
}
