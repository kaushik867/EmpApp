import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeesListServiceService } from '../services/employees-list-service.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'company', 'jobtitle'];
  dataSource;
  slNo = 0;

  constructor(private _http: EmployeesListServiceService, private route: Router) { }
  ngOnInit(): void {
    this._http.getEmployess().subscribe(data=>{
      this.dataSource=data;
    }
      );
  }
  getId(user) {
    console.log(user.id);
    this.route.navigate(['/employees/details',user.id]);
  }
}
