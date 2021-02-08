import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeesListServiceService } from 'src/app/employees/services/employees-list-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _http: EmployeesListServiceService, private router:Router) { }
  login:boolean=false;
  ngOnInit(): void {
  }
  formSubmit(formData){
   this._http.getToken(formData.value).subscribe(data=>{
     localStorage.setItem('token',data['token']);
     this.router.navigate(['employees/list'])
   }, error=>{
     this.login=true;
   })
  }
}
