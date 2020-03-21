import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module'

import { ParkingLotRoutingModule, parkingRoutedComponents } from './parking-lot-routing.module';
// import { CreateVehicleComponent } from './create-vehicle/create-vehicle.component';
// import { ParkingLotComponent } from './parking-lot.component';
// import { ParkingListComponent } from './parking-list/parking-list.component';

@NgModule({
  // declarations: [ParkingLotComponent, ParkingListComponent],
  declarations: [parkingRoutedComponents],
  imports: [
    CommonModule,
    ParkingLotRoutingModule,
    SharedModule
  ]
})
export class ParkingLotModule { }
