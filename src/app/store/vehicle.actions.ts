import {Action} from '@ngrx/store';
import {Vehicle} from '../parking-lot/models/vehicle'

export const CREATE_VEHICLE = '[CREATE] Vehicle';
export const CREATE_VEHICLE_SUCCESS = '[CREATE] Vehicle Success';
export const CREATE_VEHICLE_ERROR = '[CREATE] Vehicle Error';

export const DELETE_VEHICLE= '[DELETE] Vehicle';
export const DELETE_VEHICLE_SUCCESS = '[DELETE] Vehicle Success';
export const DELETE_VEHICLE_ERROR = '[DELETE] Vehicle Error';


export class AddVehicle implements Action {
    readonly type = CREATE_VEHICLE;
  
    constructor(public payload: Vehicle) {
    }
  }
  
  export class AddVehicleSuccess implements Action {
    readonly type = CREATE_VEHICLE_SUCCESS;
  
    constructor(public payload: number) {
    }
  }
  
  export class AddVehicleError implements Action {
    readonly type = CREATE_VEHICLE_ERROR;
  
    constructor(public payload: Error) {
    }
  }
  

  export class RemoveVehicle implements Action {
    readonly type = DELETE_VEHICLE;
  
    constructor(public payload: number) {
    }
  }
  
  export class RemoveVehicleSuccess implements Action {
    readonly type = DELETE_VEHICLE_SUCCESS;
  
    constructor(public payload: Vehicle) {
    }
  }
  
  export class RemoveVehicleError implements Action {
    readonly type = DELETE_VEHICLE_ERROR;
  
    constructor(public payload: Error) {
    }
  }