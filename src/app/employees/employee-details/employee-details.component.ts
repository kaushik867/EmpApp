import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/loader/service/loader.service';
import { EmployeesListServiceService } from '../services/employees-list-service.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit, OnDestroy{
  subscription: any;
  Emp;
  empId;
  loaded = true;
  constructor( public loader: LoaderService,private actRoute: ActivatedRoute, private _http: EmployeesListServiceService) { 
   
  }
  

  ngOnInit(): void {
    this.empId =parseInt( this.actRoute.snapshot.params.id);
    this.subscription = this._http.getEmpDetails(this.empId).subscribe(data=>{
      this.Emp = data;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
