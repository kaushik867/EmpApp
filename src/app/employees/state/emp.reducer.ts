
import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from 'src/app/modal/user.modal';
import * as empActions from './emp.action';

export interface employeeState extends EntityState<User>{
    selectedEmpId: number | null;
    loading: boolean;
    loaded: boolean;
    error: string;
}

export const empAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export const defaultEmployee = {
    id:[],
    employee:{},
    loading: false,
    loaded: false,
    error: "",
}

export const initialState = empAdapter.getInitialState(defaultEmployee);

const EmpReducer = createReducer(
     initialState,
    on(empActions.loadEmployee, state=>{
        return {...state, loading:true}
    }),
    on(empActions.loadEmpSuccess, (state,{payload})=>{
        return empAdapter.addMany(payload,{...state, loading:false, loaded:true})
    }),
    on(empActions.loadEmpFails, (state,{payload})=>{
        return {...state, error:payload};    
    }),
    on(empActions.deleteEmpSuccess, (state,{payload})=>{
        return empAdapter.removeOne(payload,{...state, loading:false,loaded:true})
    }),
    on(empActions.deleteEmpFails, (state,{payload})=>{
        return {...state, error:payload};    
    }),
    on(empActions.loadEmpByIdSuccess, (state,{payload})=>{
        return empAdapter.addOne(payload,{...state, selectedEmpId:payload.id})
    }),
    on(empActions.loadEmpByIdEmpFails, (state,{payload})=>{
        return {...state, error:payload};    
    })
);

export function empReducer(state = initialState, action: Action) {
    return EmpReducer(state, action);
}

