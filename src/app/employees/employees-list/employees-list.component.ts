import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/loader/service/loader.service';
import { EmployeesListServiceService } from '../services/employees-list-service.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { User } from 'src/app/modal/user.modal';
import { Store } from '@ngrx/store';

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
    //  this.subscription = this._http.getEmployess().subscribe(data=>{      
    //   this.dataSource = new MatTableDataSource(data);
    //   this.dataSource.sort = this.sort;
    //   this.dataSource.paginator = this.paginator;
    // });
    }
  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
  
   
  ngOnInit(): void {
   this.store.dispatch({'type':'LOADEMP'});
   this.store.subscribe(state=>{
     console.log(state.employees.user);
     this.dataSource = state.employees.user;
   })
  }

  getId(user) {
    this.route.navigate(['/employees/details',user.id]);
  }
  
  applySearch(fieldvalue){
    this.dataSource.filter = fieldvalue.trim();
  }

}
