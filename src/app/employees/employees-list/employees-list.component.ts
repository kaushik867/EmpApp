import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/loader/service/loader.service';
import { EmployeesListServiceService } from '../services/employees-list-service.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { User } from 'src/app/modal/user.modal';


@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})


export class EmployeesListComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'company', 'job'];
  dataSource = new MatTableDataSource<User>();
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true})paginator: MatPaginator;
  subscription: any;

  constructor(public loader: LoaderService, private _http: EmployeesListServiceService, private route: Router) {}
  
  ngOnInit(): void {
    this.subscription = this._http.getEmployess().subscribe(data=>{      
      this.dataSource.data = [...data];
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  getId(user) {
    this.route.navigate(['/employees/details',user.id]);
  }
  
  applySearch(fieldvalue){
    this.dataSource.filter = fieldvalue.trim();
  }

}
