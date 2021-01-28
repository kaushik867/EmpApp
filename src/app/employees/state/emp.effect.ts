import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import { EmployeesListServiceService } from '../services/employees-list-service.service';
import * as deleteEmp from '../state/emp.action'


@Injectable()
export class EmpEffects{

    constructor(private actions$: Actions,
                private empService: EmployeesListServiceService )
    { }


    loadEmps$ = createEffect(() => this.actions$.pipe(
        ofType('[Employee-list Page] loadEmp'),
        mergeMap(() => this.empService.getEmployess()
          .pipe(
            map(emp => ({ type: '[Employee-list page] loadEmpSuccess', payload: emp })),
            catchError((error) => of({ type: '[Employee-list page] loadEmpFails' },error))
          ))
        )
      );

      delete$ = createEffect(() =>
      this.actions$.pipe(
        ofType(deleteEmp.deleteEmployee),
        mergeMap(action =>
          this.empService.deleteEmp(action).pipe(
            map(() => deleteEmp.deleteEmpSuccess({ payload:action.payload })),
            catchError(error => of(deleteEmp.deleteEmpFails({ payload:error })))
          )
        )
      )
    );

    getEmp$ = createEffect(() =>
      this.actions$.pipe(
        ofType(deleteEmp.loadEmployeeById),
        mergeMap(action =>
          this.empService.getEmp(action).pipe(
            map((emp) => deleteEmp.loadEmpByIdSuccess({ payload:emp })),
            catchError(error => of(deleteEmp.loadEmpByIdEmpFails({ payload:error })))
          )
        )
      )
    );
}