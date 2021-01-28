
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { empAdapter, employeeState } from './emp.reducer';



export const getEmpFeatureState = createFeatureSelector<employeeState>("employees")

export const getEmp = createSelector(
    getEmpFeatureState,
    empAdapter.getSelectors().selectAll
)

export const getEmpLoading = createSelector(
    getEmpFeatureState,
    (state: employeeState) =>state.loading
)

export const getEmpLoaded = createSelector(
    getEmpFeatureState,
    (state: employeeState) =>state.loaded
)

export const getEmpError = createSelector(
    getEmpFeatureState,
    (state: employeeState) =>state.error
)

export const getCurrentEmpId = createSelector(
    getEmpFeatureState,
    (state: employeeState) => state.selectedEmpId
)

export const getCurrentCustomer = createSelector(
    getEmpFeatureState,
    getCurrentEmpId,
    state => state.entities[state.selectedEmpId]
)