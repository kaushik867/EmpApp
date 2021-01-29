
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
    on(empActions.loadEmpSuccess, (state,{employees})=>{
        return empAdapter.addMany(employees,{...state, loading:false, loaded:true})
    }),
    on(empActions.loadEmpFails, (state,{error})=>{
        return {...state, error:error};    
    }),
    on(empActions.deleteEmpSuccess, (state,{id})=>{
        return empAdapter.removeOne(id,{...state, loading:false,loaded:true})
    }),
    on(empActions.deleteEmpFails, (state,{error})=>{
        return {...state, error:error};    
    }),
    on(empActions.loadEmpByIdSuccess, (state,{employee})=>{
        return empAdapter.addOne(employee,{...state, selectedEmpId:employee.id})
    }),
    on(empActions.loadEmpByIdEmpFails, (state,{error})=>{
        return {...state, error:error};    
    })
);

export function empReducer(state = initialState, action: Action) {
    return EmpReducer(state, action);
}

