import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParkingLotComponent } from './parking-lot.component';
import { ParkingListComponent } from './parking-list/parking-list.component';
import { CreateVehicleComponent } from './create-vehicle/create-vehicle.component';

export const parkingRoutes: Routes = [{
  path: '',
  component: ParkingLotComponent,
  children: [
    {path: '', component: ParkingListComponent},
    {path: 'create', component: CreateVehicleComponent}
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(parkingRoutes)],
  exports: [RouterModule]
})
export class ParkingLotRoutingModule { }

export const parkingRoutedComponents = [
  ParkingLotComponent,
  ParkingListComponent,
  CreateVehicleComponent
];
