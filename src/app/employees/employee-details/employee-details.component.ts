import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeesListServiceService } from '../services/employees-list-service.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  data;
  empId;
  constructor( private actRoute: ActivatedRoute, private _http: EmployeesListServiceService) { 
    this.empId = this.actRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this._http.getEmpDetails(this.empId).subscribe(data=>{
      this.data = data;
      console.log(data);
    })
  }

}
