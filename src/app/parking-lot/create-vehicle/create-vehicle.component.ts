import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../models/vehicle';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AddVehicle } from 'src/app/store/vehicle.actions';
import { Observable } from 'rxjs';
import {getAllVehicles, getAllVehiclesWaiting} from '../../store/vehicle.reducers';


@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrls: ['./create-vehicle.component.scss']
})
export class CreateVehicleComponent implements OnInit {
  title = 'Create new vehicle';
  vehicle: Vehicle = new Vehicle();
  vehicles: Observable<Vehicle[]>;
  vehiclesWait: Observable<Vehicle[]>;
  vehicleType: string;
  form: FormGroup;

  constructor(private router: Router,
    private store: Store) {

    this.form = new FormGroup({
      'vehicleID': new FormControl(this.vehicle.vehicleID, [
        Validators.required,
        Validators.minLength(3)
      ]),
      'type': new FormControl(this.vehicle.type, [
        Validators.required
      ]),
      'space': new FormControl(this.vehicle.space, [
        Validators.required,
      ])
    });

    this.form.controls.type.valueChanges.subscribe(value => {
      console.log(value);
      this.vehicleType = value;

    })

    this.form.controls.vehicleID.valueChanges.subscribe(formValue =>{
      this.vehicles.subscribe(vehicleList => {
        vehicleList.forEach(vehicle => {
          if (vehicle.vehicleID == formValue) {
            this.form.controls.vehicleID.setErrors({duplicatedID:true})
          }
        })
      });
      this.vehiclesWait.subscribe(vehicleWaitingList => {
        vehicleWaitingList.forEach(waitingVehicle => {
          if (waitingVehicle.vehicleID == formValue) {
            this.form.controls.vehicleID.setErrors({duplicatedID:true})
          }
        })
      });

    })
  }
  get vehicleID() { return this.form.get('vehicleID'); }
  get type() { return this.form.get('type'); }
  get space() { return this.form.get('space'); }

  ngOnInit() {
    this.vehicles = this.store.select(getAllVehicles);
    this.vehiclesWait = this.store.select(getAllVehiclesWaiting);    

  }
  onSaveVehicle() {
    this.store.dispatch(new AddVehicle(this.form.value));
    this.router.navigate(['/list']);
  }
  reset() {
    this.form.reset({
      vehicleID: '',
      type: '',
      space: ''
    })
  }
}
