import { Action } from '@ngrx/store';

import { User } from '../../modal/user.modal';

export enum cutomerActionType{
    LOAD_EMP = "[User] Load Employee",
    LOAD_EMP_FAIL = "[User] Load Employee Fail",
    LOAD_EMP_SUCCESS = "[User] Load Employee Success"
}