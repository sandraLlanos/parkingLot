import * as  vehicleActions from '../store/vehicle.actions';
import { AppAction } from '../app.actions';
import { Vehicle } from '../parking-lot/shared/vehicle';
import { createFeatureSelector, createSelector } from '@ngrx/store';

// export interface State {
//     queue: [],
//     waitQueue: []
// }

// const initialState: State = {
//     queue: [],
//     waitQueue: []
// }

// export function vehicleReducer(state = initialState, action: VehicleActions.actions) {
//     switch (action.type) {
//         case VehicleActionsTypes.createVehicle:
//             if (state.queue.length >= 8) {
//                 return {
//                     ...state,
//                     waitQueue: [...state.waitQueue, action.payload]
//                 }
//             } else {
//                 return {
//                     ...state,
//                     queue: [...state.queue, action.payload]
//                 }
//             }
//             break
//         case VehicleActionsTypes.deleteVehicle:
//             let queue = state.queue.filter((val, index) => index !== action.payload);
//             if (state.waitQueue.length >= 1) {
//                 return {
//                     ...state,
//                     queue: [...queue, ...state.waitQueue.slice(0, 1)],
//                     waitQueue: [...state.waitQueue.slice(1)]
//                 }
//             } else {
//                 return {
//                     ...state,
//                     queue: queue,
//                 }
//             }
//         default:
//             return state;
//     }
// }


export interface State {
    data: Vehicle[];
    data1: Vehicle[];
    selected: Vehicle;
    action: string;
    done: boolean;
    error?: Error;
}

const initialState: State = {
    data: [],
    data1: [],
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

                if (state.data.length >= 2) {
                    const data = [
                        ...state.data1,
                        newUser
                    ];
                    return {
                        ...state,
                        data1: data,
                        selected: null,
                        error: null,
                        done: true
                    };
                } else {
                    const data = [
                        ...state.data,
                        newUser
                    ];
                    return {
                        ...state,
                        data: data,
                        selected: null,
                        error: null,
                        done: true
                    };
                }
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
                let data = state.data.filter(h => h.plaque !== state.selected.plaque);
                let data1 = state.data1.slice();
                if (state.data1.length > 0){
                    data.push(state.data1[0]);
                    data1.shift() 
                }
                
                return {
                    ...state,
                    data,
                    data1,
                    selected: null,
                    error: null,
                    done: true
                };
            }
        // case vehicleActions.DELETE_VEHICLE_ERROR:
        //     return {
        //         ...state,
        //         selected: null,
        //         done: true,
        //         error: action.payload
        //     };
    }
    return state;
}

/*************************
 * SELECTORS
 ************************/

export const getVehiclesState = createFeatureSelector<State>('vehicles');
export const getAllVehicles = createSelector(getVehiclesState, (state: State) => state.data);
export const getAllVehicles1 = createSelector(getVehiclesState, (state: State) => state.data1);
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

