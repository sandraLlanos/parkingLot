import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../models/vehicle';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as vehicleActions from '../../store/vehicle.actions';
import { getAllVehicles } from '../../store/vehicle.reducers';
import { getAllVehiclesWaiting } from '../../store/vehicle.reducers';

@Component({
  selector: 'app-parking-list',
  templateUrl: './parking-list.component.html',
  styleUrls: ['./parking-list.component.scss']
})
export class ParkingListComponent implements OnInit {
  message: string;
  showMessage: boolean
  vehicles: Observable<Vehicle[]>;
  vehiclesWaiting: Observable<Vehicle[]>;
  dataSource: any;
  displayedColumns: string[] = ['Plaque', 'Type', 'Space', 'Actions'];
  displayedColumnswait: string[] = ['Plaque', 'Type', 'Space'];
  constructor(private router: Router,
    private store: Store) {
  }

  ngOnInit() {
    this.vehicles = this.store.select(getAllVehicles);
    this.vehiclesWaiting = this.store.select(getAllVehiclesWaiting);
  }

  delete(id: number) {
    if (confirm('Are you sure do you want to delete this Vehicle?')) {
    this.store.dispatch(new vehicleActions.RemoveVehicle(id));
    this.message = 'The Vehicle was deleted successfully!!!';
    this.showMessage = true;
    }
  }
}
