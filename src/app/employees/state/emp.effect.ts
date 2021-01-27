import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { EmployeesListServiceService } from '../services/employees-list-service.service';


@Injectable()
export class EmpEffects{

    constructor(private actions$: Actions,
                private empService: EmployeesListServiceService )
    { }


    loadMovies$ = createEffect(() => this.actions$.pipe(
        ofType('[Employee-list Page] loadEmp'),
        mergeMap(() => this.empService.getEmployess()
          .pipe(
            map(emp => ({ type: '[Employee-list page] loadEmpSuccess', payload: emp })),
            catchError(() => of({ type: '[Employee-list page] loadEmpFails' }))
          ))
        )
      );
}