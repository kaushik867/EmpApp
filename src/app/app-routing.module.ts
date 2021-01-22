import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './common/home/home.component';
import { EmployeesModule } from './employees/employees.module';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch:'full' },
  { path: 'home', component: HomeComponent },
  { path: 'employees', loadChildren: './employees/employees.module#EmployeesModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
