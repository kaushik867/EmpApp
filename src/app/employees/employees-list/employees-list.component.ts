import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/loader/service/loader.service';
import { EmployeesListServiceService } from '../services/employees-list-service.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { User } from 'src/app/modal/user.modal';
import { Store } from '@ngrx/store';
import * as EmpAction from '../state/emp.action';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})


export class EmployeesListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'company', 'job'];
  dataSource:MatTableDataSource<User>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator)paginator: MatPaginator;
  subscription: any;


  constructor(private store: Store<any>,public loader: LoaderService, private _http: EmployeesListServiceService, private route: Router) { 
    this.store.dispatch(EmpAction.loadEmployee());
    this.subscription = this.store.subscribe(state=>{
      console.log(state.employees);
      this.dataSource = state.employees.employee;
    })
   }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
   
  ngOnInit(): void {
  
  }

  getId(user) {
    this.route.navigate(['/employees/details',user.id]);
  }
  
  applySearch(fieldvalue){
    this.dataSource.filter = fieldvalue.trim();
  }

}
