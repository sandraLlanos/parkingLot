import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../shared/vehicle';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as vehicleActions from '../../store/vehicle.actions';
import {getAllVehicles} from '../../store/vehicle.reducers';

@Component({
  selector: 'app-parking-list',
  templateUrl: './parking-list.component.html',
  styleUrls: ['./parking-list.component.scss']
})
export class ParkingListComponent implements OnInit {
  message: string;
  showMessage:boolean
  vehicles: Observable<Vehicle[]>;
  constructor(private router: Router,
    private store: Store) {
  }

  ngOnInit() {
    console.log('... initializing vehicle list component.');

    this.vehicles = this.store.select(getAllVehicles);

  }

  delete(id: number) {
    if (confirm('Are you sure do you want to delete this User?')) {
      this.store.dispatch(new vehicleActions.RemoveVehicle(id));
      this.message = 'The user was deleted successfully!!!';
      this.showMessage = true;
    }
  }
}
