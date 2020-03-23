import { Vehicle } from './../parking-lot/models/vehicle';
import {
    AddVehicle,
    AddVehicleSuccess,
    AddVehicleError,
    RemoveVehicle,
    RemoveVehicleSuccess,
    RemoveVehicleError,
    CREATE_VEHICLE,
    CREATE_VEHICLE_ERROR,
    CREATE_VEHICLE_SUCCESS,
    DELETE_VEHICLE,
    DELETE_VEHICLE_ERROR,
    DELETE_VEHICLE_SUCCESS
} from './vehicle.actions';

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

describe('Create new Vehicle', () => {
    it('should create the action CREATE_VEHICLE', () => {
        const payload = MOCK_DATA[1];
        const action = new AddVehicle(payload);
        expect({...action}).toEqual({
            type: CREATE_VEHICLE, payload
        });
    });

    it('should create the action CREATE_VEHICLE_SUCCESS', () => {
        const payload = MOCK_DATA[1].vehicleID;
        const action = new AddVehicleSuccess(payload);
        expect({...action}).toEqual({ type: CREATE_VEHICLE_SUCCESS, payload });
    });

    it('should create the action CREATE_VEHICLE_ERROR', () => {
        const payload = new Error('Error while adding a new Vehicle');
        const action = new AddVehicleError(payload);
        expect({...action}).toEqual({ type: CREATE_VEHICLE_ERROR, payload });
    });
});

describe('Remove a Vehicle ACTION', () => {
    it('should create the action DELETE_VEHICLE', () => {
        const payload = MOCK_DATA[1].vehicleID;
        const action = new RemoveVehicle(payload);
        expect({...action}).toEqual({ type: DELETE_VEHICLE, payload });
    });

    it('should create the action DELETE_VEHICLE_SUCCESS', () => {
        const payload = MOCK_DATA[1];
        const action = new RemoveVehicleSuccess(payload);
        expect({...action}).toEqual({ type: DELETE_VEHICLE_SUCCESS, payload });
    });

    it('should create the action DELETE_VEHICLE_ERROR', () => {
        const payload = new Error('Error removing Vehicle.');
        const action = new RemoveVehicleError(payload);
        expect({...action}).toEqual({ type: DELETE_VEHICLE_ERROR, payload });
    });
});
