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
import { Vehicle } from '../parking-lot/shared/vehicle';
import { VehicleService } from '../parking-lot/shared/vehicle.service';

@Injectable()
export class VehiclesEffects {
    constructor(private actions$: Actions,
        private svc: VehicleService) {
    }

    @Effect()
    createVehicle$ = this.actions$.pipe(
        ofType(vehicleActions.CREATE_VEHICLE),
        tap(v => console.log(vehicleActions.CREATE_VEHICLE)),
        map((action: AddVehicle) => action.payload),
        switchMap(newUser => this.svc.insert(newUser)),
        map((response) => new AddVehicleSuccess(response.plaque)),
        catchError((err) => [new AddVehicleError(err)])
    );
    @Effect()
    deleteVehicle$ = this.actions$.pipe(
        ofType(vehicleActions.DELETE_VEHICLE),
        map((action: RemoveVehicle) => action.payload),
        switchMap(id => this.svc.delete(id)),
        map((vehicle: Vehicle) => new RemoveVehicleSuccess(vehicle)),
        catchError((err) => [new RemoveVehicleError(err)])
    )

    
}