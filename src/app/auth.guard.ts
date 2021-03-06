import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { EmployeesListServiceService } from '../app/employees/services/employees-list-service.service'


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private auth: EmployeesListServiceService, private _router: Router){}

  canActivate(): boolean{
    if(this.auth.loggedIn()){
      return true;
    }
    else{
      this._router.navigate(['login']);
      return false;
    }
  }
}
