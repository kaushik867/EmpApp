import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/loader/service/loader.service';
import { EmployeesListServiceService } from '../services/employees-list-service.service';
import { Store } from '@ngrx/store';
import * as getEmp from '../state/emp.selector'
import * as EmpAction from '../state/emp.action';
import { Observable } from 'rxjs';
import { User } from 'src/app/modal/user.modal';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit, OnDestroy{
  subscription: any;
  Emp;
  empId;
  dataSource$: Observable<User>;
  loaded = true;
  constructor(private store:Store<any>, public loader: LoaderService,private actRoute: ActivatedRoute, private _http: EmployeesListServiceService) { 
   
  }
  

  ngOnInit(): void {
    this.empId =parseInt( this.actRoute.snapshot.params.id);
    this.store.dispatch(EmpAction.loadEmployeeById({id: this.empId}))
    this.dataSource$ = this.store.select(getEmp.getCurrentCustomer);
    this.subscription = this.dataSource$.subscribe(data=>{
      this.Emp = data;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
