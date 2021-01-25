import { Component, OnInit, ViewChild } from '@angular/core';
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
export class EmployeesListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'company', 'jobtitle'];
  data: User[];
  dataSource:MatTableDataSource<User>;
  @ViewChild(MatSort ,{static: false})sort: MatSort;
  @ViewChild(MatPaginator)paginator: MatPaginator;


  constructor(public loader: LoaderService, private _http: EmployeesListServiceService, private route: Router) { }
   
  ngOnInit(): void {
    this._http.getEmployess().subscribe(data=>{
      this.data=data;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  getId(user) {
    this.route.navigate(['/employees/details',user.id]);
  }
  
  applySearch(fieldvalue){
    this.dataSource.filter = fieldvalue.trim();
  }

}
