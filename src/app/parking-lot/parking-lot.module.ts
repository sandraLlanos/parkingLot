import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module'

import { ParkingLotRoutingModule, parkingRoutedComponents } from './parking-lot-routing.module';
// import { CreateVehicleComponent } from './create-vehicle/create-vehicle.component';
// import { ParkingLotComponent } from './parking-lot.component';
// import { ParkingListComponent } from './parking-list/parking-list.component';

// ngrx elements
import {StoreModule, ActionReducerMap} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {VehiclesEffects} from '../store/vehicle.effects';
import * as vehiclesReducer from '../store/vehicle.reducers';
import { BrowserModule } from '@angular/platform-browser';

export const reducers: ActionReducerMap<any> = {
  vehicles: vehiclesReducer.reducer
};


@NgModule({
  // declarations: [ParkingLotComponent, ParkingListComponent],
  declarations: [parkingRoutedComponents],
  imports: [
    CommonModule,
    ParkingLotRoutingModule,
    SharedModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([VehiclesEffects])
  ],
  providers: [ ]
})
export class ParkingLotModule { }
