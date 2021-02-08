import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { LoaderModule } from '../loader/loader/loader.module';
import { AuthGuard } from '../auth.guard';




const proRoute: Routes=[
  { path: 'list' , component: EmployeesListComponent, canActivate:[AuthGuard]},
  { path: 'details/:id', component: EmployeeDetailsComponent, canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [
    EmployeesListComponent,
    EmployeeDetailsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(proRoute),
    HttpClientModule,
    LoaderModule
  ],
})
export class EmployeesModule {
  constructor(){
    console.log('emplist loaded');
  }
 }
