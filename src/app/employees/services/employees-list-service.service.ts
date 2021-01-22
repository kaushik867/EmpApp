import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class EmployeesListServiceService {

  constructor(private _http: HttpClient) { }

  getEmployess():Observable<[]>{
    return this._http.get<[]>("http://localhost/api/employees")
    .pipe(catchError(this.errorHandler));
  }

  getEmpDetails(id):Observable<[]>{
    return this._http.get<[]>("http://localhost/api/employees/" + id)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error.error || "server error");
  }
}