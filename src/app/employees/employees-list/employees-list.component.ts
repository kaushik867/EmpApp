import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/loader/service/loader.service';
import { EmployeesListServiceService } from '../services/employees-list-service.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { User } from 'src/app/modal/user.modal';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as EmpAction from '../state/emp.action';
import * as fromEmp from '../state/emp.selector';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})


export class EmployeesListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'company', 'job','delete'];
  dataSource$: Observable<User[]>;
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator)paginator: MatPaginator;
  subscription: any;


  constructor(private store: Store<any>,public loader: LoaderService, private _http: EmployeesListServiceService, private route: Router) { 
    this.store.dispatch(EmpAction.loadEmployee());
    this.dataSource$ = this.store.select(fromEmp.getEmp);
    this.subscription = this.dataSource$.subscribe(data=>{
      this.dataSource= new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
    console.log(this.dataSource );
   }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
   
  ngOnInit(): void {
  
  }

  getId(user) {
    this.route.navigate(['/employees/details',user.id]);
  }

  deleteEmp(user){
    if(confirm("are you sure want to delete that record"))
    {
      console.log(user.id);
      this.store.dispatch(EmpAction.deleteEmployee({payload:user.id}));
    }

  }
  
  applySearch(fieldvalue){
    this.dataSource.filter = fieldvalue.trim();
  }

}
