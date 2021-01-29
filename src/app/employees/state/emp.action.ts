import { createAction, props } from '@ngrx/store';
import { User } from '../../modal/user.modal';

export interface actionPayload {
    employees ?: User[];
    id ?: number;
    error ?: string;
    employee ?:  User;
}

export enum empActionType{
    LOAD_EMP = '[Employee-list Page] loadEmp',
    LOAD_EMP_SUCCESS = '[Employee-list page] loadEmpSuccess',
    LOAD_EMP_FAILS = '[Employee-list page] loadEmpFails',

    DELETE_EMP = '[Employee-list Page] deleteEmp',
    DELETE_EMP_SUCCESS = '[Employee-list Page] deleteEmpSuccess',
    DELETE_EMP_FAIL = '[Employee-list Page] deleteEmpFail',

    LOAD_EMP_BY_ID = '[Employee-list Page] loadEmpById',
    LOAD_EMP_BY_ID_SUCCESS = '[Employee-list Page] loadEmpByIdSuccess',
    LOAD_EMP_BY_ID_FAIL = '[Employee-list Page] EmpByIdFail'
}

export const loadEmployee = createAction(
    empActionType.LOAD_EMP,
);

export const loadEmpSuccess = createAction(
    empActionType.LOAD_EMP_SUCCESS,
    props<actionPayload>()
)

export const loadEmpFails = createAction(
    empActionType.LOAD_EMP_FAILS,
    props<actionPayload>()
)

export const deleteEmployee = createAction(
    empActionType.DELETE_EMP,
    props<actionPayload>()
);

export const deleteEmpSuccess = createAction(
    empActionType.DELETE_EMP_SUCCESS,
    props<actionPayload>()
)

export const deleteEmpFails = createAction(
    empActionType.DELETE_EMP_FAIL,
    props<actionPayload>()
)

export const loadEmployeeById = createAction(
    empActionType.LOAD_EMP_BY_ID,
    props<actionPayload>()
);

export const loadEmpByIdSuccess = createAction(
    empActionType.LOAD_EMP_BY_ID_SUCCESS,
    props<actionPayload>()
)

export const loadEmpByIdEmpFails = createAction(
    empActionType.LOAD_EMP_BY_ID_FAIL,
    props<actionPayload>()
)