import { createAction, props } from '@ngrx/store';

import { User } from '../../modal/user.modal';

export const loadEmployee = createAction(
    '[Employee-list Page] loadEmp',
);

export const loadEmpSuccess = createAction(
    '[Employee-list page] loadEmpSuccess',
    props<{ payload: User[] }>()
)

export const loadEmpFails = createAction(
    '[Employee-list page] loadEmpFails',
    props<{payload: string}>()
)