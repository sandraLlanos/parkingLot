import { State, reducer } from './vehicle.reducers';
import {
    AddVehicle,
    AddVehicleSuccess,
    AddVehicleError,
    RemoveVehicle,
    RemoveVehicleSuccess,
    RemoveVehicleError,
    CREATE_VEHICLE,
    DELETE_VEHICLE
} from './vehicle.actions';
import { Vehicle } from './../parking-lot/models/vehicle';

const MOCK_DATA: Vehicle[] = [
    {
        vehicleID: 111,
        type: 'Motorcycle',
        space: 'small'
    },
    {
        vehicleID: 112,
        type: 'Truck',
        space: 'big'
    }
];

let state: State = {
    queue: [],
    waitqueue: [],
    selected: null,
    action: null,
    done: false,
    error: null
};

describe('Create new Vehicle REDUCER', () => {
    it('should reduce the action CREATE_VEHICLE', () => {
        const payload = {
            vehicleID: 123,
            type: 'Motorcycle',
            space: 'big'
          };
        const action = new AddVehicle(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            selected: payload,
            action: CREATE_VEHICLE,
            done: false
        });
        state = newState;
    });

    it('should reduce the action CREATE_VEHICLE_SUCCESS', () => {
        const payload = 123;
        const action = new AddVehicleSuccess(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            queue: [
                ...state.queue,
                {
                    ...state.selected
                }
            ],
            selected: null,
            done: true
        });
        state = {...state, selected: null, done: true};
    });

    it('should reduce the action CREATE_VEHICLE_SUCCESS when wating vehicles exist', () => {
        const payload = 123;
        const action = new AddVehicleSuccess(payload);
        state.queue = MOCK_DATA;
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            waitqueue: [
                ...state.waitqueue,
                {
                    ...state.selected
                }
            ],
            selected: null,
            done: true
        });
        state = {...state, selected: null, done: true};
    });

    it('should reduce the action CREATE_VEHICLE_ERROR', () => {
        const payload = new Error('Error creating the Vehicle');
        const action = new AddVehicleError(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            selected: null,
            done: true,
            error: payload
        });
    });
});

describe('Deleting existing Vehicle REDUCER', () => {
    it('should reduce the action DELETE_VEHICLE', () => {
        const selected = MOCK_DATA[1];
        const payload = selected.vehicleID;
        const action = new RemoveVehicle(payload);
        const newState = reducer(state, action);

        expect({ ...newState}).toEqual({
            ...state,
            selected,
            action: DELETE_VEHICLE,
            done: false
        });
        state = newState;
    });

    it('should reduce the action DELETE_VEHICLE_SUCCESS', () => {
        const payload = MOCK_DATA[1];
        const action = new RemoveVehicleSuccess(payload);
        const data = state.queue.filter(h => h.vehicleID !== state.selected.vehicleID);
        const newState = reducer(state, action);
        expect({...newState}).toEqual(
            {...state,
                queue: data,
                waitqueue: [],
                selected: null,
                done: true
            });
    });

    it('should reduce the action DELETE_VEHICLE_SUCCESS when wating vehicles exist', () => {
        const payload = MOCK_DATA[1];
        state.waitqueue = MOCK_DATA;
        const action = new RemoveVehicleSuccess(payload);
        const data = state.queue.filter(h => h.vehicleID !== state.selected.vehicleID);
        data.push(state.waitqueue[0]);
        const newState = reducer(state, action);
        expect({...newState}).toEqual(
            {...state,
                queue: data,
                waitqueue: [MOCK_DATA[1]],
                selected: null,
                done: true
            });
        state = {...state, selected: null, done: true};
    });

    it('should reduce the action DELETE_VEHICLE_ERROR', () => {
        const payload = new Error('Error while deleting the Vehicle');
        const action = new RemoveVehicleError(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({...state, done: true, error: payload});
    });
});
