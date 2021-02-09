import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { User } from 'src/app/modal/user.modal';

@Injectable({
  providedIn: 'root'
})
export class EmployeesListServiceService {

  constructor(private _http: HttpClient) { }

  getEmployess(pageNo:number,limit:number):Observable<User[]>{
    return this._http.get<User[]>(`http://localhost/api/employees?page=${pageNo}&limit=${limit}`)
    .pipe(catchError(this.errorHandler));
  }

  searchEmp(pageNo:number,query:string):Observable<User[]>{
    return this._http.get<User[]>(`http://localhost/api/employees?page=${pageNo}&&query=${query}`)
    .pipe(catchError(this.errorHandler));
  }

  getEmpDetails(id):Observable<[]>{
    return this._http.get<[]>("http://localhost/api/employees/"+ id)
    .pipe(catchError(this.errorHandler));
  }

  getToken(data):Observable<object>{
    return this._http.post('http://localhost/getToken',data);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error.error || "server error");
  }

  
}
