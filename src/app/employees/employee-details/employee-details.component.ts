import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeesListServiceService } from '../services/employees-list-service.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  Emp;
  empId;
  loaded = true;
  constructor( private actRoute: ActivatedRoute, private _http: EmployeesListServiceService) { 
   
  }

  ngOnInit(): void {
    this.empId =parseInt( this.actRoute.snapshot.params.id);
    this._http.getEmpDetails(this.empId).subscribe(data=>{
      this.Emp = data;
      this.loaded=false;
    })
  }

}
