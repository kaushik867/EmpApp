import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import { EmployeesListServiceService } from '../services/employees-list-service.service';
import * as employeeAction from '../state/emp.action';

@Injectable()
export class EmpEffects{

    constructor(private actions$: Actions,
                private empService: EmployeesListServiceService )
    { }


    loadEmps$ = createEffect(() => this.actions$.pipe(
        ofType(employeeAction.loadEmployee),
        mergeMap(() => this.empService.getEmployess()
          .pipe(
              map(emp => employeeAction.loadEmpSuccess({employees:emp})),
              catchError((error) => of(employeeAction.loadEmpFails({error:error})))
            )
          )
        )
      );

      delete$ = createEffect(() =>
      this.actions$.pipe(
        ofType(employeeAction.deleteEmployee),
        mergeMap(action =>
          this.empService.deleteEmp(action).pipe(
            map(() => employeeAction.deleteEmpSuccess({ id:action.id })),
            catchError(error => of(employeeAction.deleteEmpFails({ error:error })))
          )
        )
      )
    );

    getEmp$ = createEffect(() =>
      this.actions$.pipe(
        ofType(employeeAction.loadEmployeeById),
        mergeMap(action =>
          this.empService.getEmp(action).pipe(
            map((emp) => employeeAction.loadEmpByIdSuccess({ employee:emp })),
            catchError(error => of(employeeAction.loadEmpByIdEmpFails({ error:error })))
          )
        )
      )
    );
}