import * as  vehicleActions from '../store/vehicle.actions';
import { AppAction } from '../app.actions';
import { Vehicle } from '../parking-lot/models/vehicle';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const PARKING_LOT_SIZE = 7;

export interface State {
    queue: Vehicle[];
    waitqueue: Vehicle[];
    selected: Vehicle;
    action: string;
    done: boolean;
    error?: Error;
}

const initialState: State = {
    queue: [],
    waitqueue: [],
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
                const newVehicle = {
                    ...state.selected,  
                };

                if (state.queue.length >= PARKING_LOT_SIZE) {
                    const dataWait = [
                        ...state.waitqueue,
                        newVehicle
                    ];
                    return {
                        ...state,
                        waitqueue: dataWait,
                        selected: null,
                        error: null,
                        done: true
                    };
                } else {
                    const data = [
                        ...state.queue,
                        newVehicle
                    ];
                    return {
                        ...state,
                        queue: data,
                        selected: null,
                        error: null,
                        done: true
                    };
                }
            }
        case vehicleActions.DELETE_VEHICLE:
            {
                console.log(action.payload)
                const selected = state.queue.find(h => h.vehicleID === action.payload);
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
                let data = state.queue.filter(h => h.vehicleID !== state.selected.vehicleID);
                let dataWait = state.waitqueue.slice();
                if (state.waitqueue.length > 0) {
                    data.push(state.waitqueue[0]);
                    dataWait.shift()
                }

                return {
                    ...state,
                    queue:data,
                    waitqueue:dataWait,
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


export const getVehiclesState = createFeatureSelector<State>('vehicles');
export const getAllVehicles = createSelector(getVehiclesState, (state: State) => state.queue);
export const getAllVehiclesWaiting = createSelector(getVehiclesState, (state: State) => state.waitqueue);
