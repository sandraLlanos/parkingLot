import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../shared/vehicle';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {AppState} from '../../app.state';
import { AddVehicle } from 'src/app/store/vehicle.actions';

@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrls: ['./create-vehicle.component.scss']
})
export class CreateVehicleComponent implements OnInit {
  title = 'Create new vehicle';
  vehicle: Vehicle = new Vehicle();
  form: FormGroup;

  constructor(private router: Router, 
    private store: Store<AppState>) {
    this.form = new FormGroup({
      'plaque': new FormControl(this.vehicle.plaque, [
        // Validators.required,
        // Validators.minLength(3)
      ]),
      'type': new FormControl(this.vehicle.vehicle, [
        // Validators.required,
        // Validators.minLength(3)
      ]),
      'space': new FormControl(this.vehicle.space, [
        // Validators.required,
        // Validators.minLength(3)
      ])
    });

  }

  ngOnInit() {
    console.log('... initializing create vehicle component.');
  }
  onBack() {
    this.router.navigate(['/list']);
  }
  onSaveVehicle() {
    console.log('onsave');
    this.store.dispatch(new AddVehicle(this.form.value));
    console.log(this.form.value);
  }
  reset() {
    this.form.reset({
      plaque: '',
      vehicle: '',
      space: ''
    })
  }
}
