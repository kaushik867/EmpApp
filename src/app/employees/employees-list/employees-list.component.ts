import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/loader/service/loader.service';
import { EmployeesListServiceService } from '../services/employees-list-service.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { User } from 'src/app/modal/user.modal';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})


export class EmployeesListComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'company', 'job'];
  dataSource:MatTableDataSource<User> = new MatTableDataSource<User>();
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true})paginator: MatPaginator;
  subscription: Subscription;
  totalRecord:number;
  pageSize:number;
  pageLength:number;
  pageEvent:PageEvent;
  currentPage:number = 0;
  limit:number = 8;
  subjectKey = new Subject<string>();
  obsData: Subscription;
  constructor(public loader: LoaderService, private _http: EmployeesListServiceService, private route: Router) {}
  
  ngOnInit(): void {
    this.obsData = this.subjectKey.pipe(debounceTime(500),distinctUntilChanged()).subscribe(data=>{
      this.searchEmp(data);
    });
    this.onPageChange(this.currentPage)
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  getId(user) {
    this.route.navigate(['/employees/details',user.id]);
  }
  
  onKeyUp(fieldvalue){
    this.subjectKey.next(fieldvalue);
  }

  onPageChange(pageNo){
    this.subscription =this._http.getEmployess(pageNo+1,this.limit).subscribe(data=>{
      this.dataSource.data = [...data['results']];
      this.pageSize = data['recordsCount'];
      this.pageLength = data['totalRecords'];
    })
  }

  searchEmp(data){
    if(data){
      this.subscription=this._http.searchEmp(this.currentPage,data).subscribe(data=>{
        this.dataSource.data = [...data['results']]
        this.pageSize = data['recordsCount'];
      })
    }
    else{
      this.onPageChange(this.currentPage);
    }
    
  }

}
