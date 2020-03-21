import * as  vehicleActions from '../store/vehicle.actions';
import { AppAction } from '../app.actions';
import { Vehicle } from '../parking-lot/shared/vehicle';
import { createFeatureSelector, createSelector } from '@ngrx/store';



export interface State {
    data: Vehicle[];
    selected: Vehicle;
    action: string;
    done: boolean;
    error?: Error;
}

const initialState: State = {
    data: [],
    selected: null,
    action: null,
    done: false,
    error: null
};

export function reducer(state = initialState, action: AppAction): State {
    switch (action.type) {
        case vehicleActions.CREATE_VEHICLE:
            return {
                ...state,
                selected: action.payload,
                action: vehicleActions.CREATE_VEHICLE,
                done: false,
                error: null
            };
        case vehicleActions.CREATE_VEHICLE_SUCCESS:
            {
                const newUser = {
                    ...state.selected,
                    ID: action.payload
                };
                const data = [
                    ...state.data,
                    newUser
                ];
                return {
                    ...state,
                    data,
                    selected: null,
                    error: null,
                    done: true
                };
            }
        case vehicleActions.CREATE_VEHICLE_ERROR:
            return {
                ...state,
                selected: null,
                done: true,
                error: action.payload
            };
        case vehicleActions.DELETE_VEHICLE:
            {
                const selected = state.data.find(h => h.plaque === action.payload);
                return {
                    ...state,
                    selected,
                    action: vehicleActions.DELETE_VEHICLE,
                    done: false,
                    error: null
                };
            }
        case vehicleActions.DELETE_VEHICLE_SUCCESS:
            {
                const data = state.data.filter(h => h.plaque !== state.selected.plaque);
                return {
                    ...state,
                    data,
                    selected: null,
                    error: null,
                    done: true
                };
            }
        case vehicleActions.DELETE_VEHICLE_ERROR:
            return {
                ...state,
                selected: null,
                done: true,
                error: action.payload
            };
    }
    return state;
}
    
/*************************
 * SELECTORS
 ************************/

export const getVehiclesState = createFeatureSelector<State>('vehicles');
export const getAllVehicles = createSelector(getVehiclesState, (state: State) => state.data);
export const isDeleted = createSelector(getVehiclesState, (state: State) =>
    state.action === vehicleActions.DELETE_VEHICLE && state.done && !state.error);
export const isCreated = createSelector(getVehiclesState, (state: State) =>
    state.action === vehicleActions.CREATE_VEHICLE && state.done && !state.error);

export const getDeleteError = createSelector(getVehiclesState, (state: State) => {
    return state.action === vehicleActions.DELETE_VEHICLE
        ? state.error
        : null;
});
export const getCreateError = createSelector(getVehiclesState, (state: State) => {
    return state.action === vehicleActions.CREATE_VEHICLE
        ? state.error
        : null;
});

// export const getVehicleState = (state: State) => state.data;
// export const getVehicleAction = (action: any) => action.payload
// export const getVehicleError = (state: State) => state.error;


// export const getVehicleState = createFeatureSelector<State>('vehicles');
// export const getAllvehicles = createSelector(getVehicleState, (state: State) => state.data);
// export const isDeleted = createSelector(getVehicleState, (state: State) =>
//     state.action === VehicleActionsTypes.deleteVehicle && state.done && !state.error);
// export const isCreated = createSelector(getVehicleState, (state: State) =>
//     state.action === VehicleActionsTypes.createVehicle && state.done && !state.error);
// export const getDeleteError = createSelector(getVehicleState, (state: State) => {
//     return state.action === VehicleActionsTypes.deleteVehicle
//         ? state.error
//         : null;
// });
// export const getCreateError = createSelector(getVehicleState, (state: State) => {
//     return state.action === VehicleActionsTypes.createVehicle
//         ? state.error
//         : null;
// });

