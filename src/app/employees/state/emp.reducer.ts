// const initialState = {
//     user: [
//         {
//             "id": "18",
//             "title": "Mr.",
//             "firstname": "kaushik",
//             "lastname": "Gupta",
//             "job": "trainee Engineer",
//             "company": "Mindfire",
//             "phone": {
//                 "Mobile": "8789037367"
//             },
//             "email": {
//                 "Personal": "kaushik867@gmail.com"
//             }
//         }
//     ],
//     loading: false,
//     loaded: true
// }

// export function empReducer(state = initialState, action) {
    
//     switch(action.type){
//         case "LOAD_EMP" :{
//             return{
//                 ...state,
//                 loading:true,
//                 loaded:false
//             }
//         }
//         default:{
//             return state;
//         }
//     }
// }


import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/modal/user.modal';
import * as empActions from './emp.action';

export interface employeeState{
    employee: User[];
    loading: boolean;
    loaded: boolean;
    error: string;
}

export const initialState: employeeState = {
    employee: [],
    loading: false,
    loaded: false,
    error: "",
}

const EmpReducer = createReducer(
    initialState,
    on(empActions.loadEmployee, state=>({...state, loading:true})),
    on(empActions.loadEmpSuccess, (state,{payload})=>({...state, employee: payload, loading:false, loaded:true })),
    on(empActions.loadEmpFails, (state,{payload})=>({...state,error:payload}))
);

export function empReducer(state = initialState, action: Action) {
    return EmpReducer(state, action);
}