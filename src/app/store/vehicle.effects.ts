import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store'
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import * as vehicleActions from './vehicle.actions';
import {
    AddVehicle,
    AddVehicleError,
    AddVehicleSuccess,
    RemoveVehicle,
    RemoveVehicleError,
    RemoveVehicleSuccess,
} from './vehicle.actions';
import { Vehicle } from '../parking-lot/models/vehicle';

@Injectable()
export class VehiclesEffects {
    constructor(private actions$: Actions) {
    }

    @Effect()
    createVehicle$ = this.actions$.pipe(
        ofType(vehicleActions.CREATE_VEHICLE),
        map((action: AddVehicle) => action.payload),
        map((response) => new AddVehicleSuccess(response.vehicleID)),
        catchError((err) => [new AddVehicleError(err)])
    );
    @Effect()
    deleteVehicle$ = this.actions$.pipe(
        ofType(vehicleActions.DELETE_VEHICLE),
        map((action: RemoveVehicleSuccess) => action.payload),
        map((vehicle: Vehicle) => new RemoveVehicleSuccess(vehicle)),
        catchError((err) => [new RemoveVehicleError(err)])
    )

    
}