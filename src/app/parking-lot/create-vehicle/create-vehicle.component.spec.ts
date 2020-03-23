import { Vehicle } from './../models/vehicle';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateVehicleComponent } from './create-vehicle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import * as vehiclesReducer from '../../store/vehicle.reducers';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Router } from '@angular/router';

export const reducers: ActionReducerMap<any> = {
  vehicles: vehiclesReducer.reducer
}; 

describe('CreateVehicleComponent', () => {
  let component: CreateVehicleComponent;
  let fixture: ComponentFixture<CreateVehicleComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreateVehicleComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCardModule,
        RouterTestingModule,
        StoreModule.forRoot(reducers),
        MatInputModule,
        BrowserAnimationsModule,
        FlexLayoutModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVehicleComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch in store and navigate through router when onSaveVehicle() function is called', () => {
    spyOn(router, 'navigate');
    component.onSaveVehicle();
    expect(router.navigate).toHaveBeenCalled();
  });

  it('should listen for type from control changes and assing control value to vehicleType variable', () => {
    component.vehicleType = 'Truck';
    component.form.controls.type.setValue('Motorcycle');
    expect(component.vehicleType).toBe('Motorcycle');
  });

  it('should mark as error if vehicleID is duplicated in vehicle queue', () => {
    spyOn(component.form.controls.vehicleID, 'setErrors');
    const userInput: Vehicle = {
      vehicleID: 123,
      type: 'Motorcycle',
      space: 'small'
    };
    component.vehicles = of([userInput]);
    component.form.controls.vehicleID.setValue('123');
    expect(component.form.controls.vehicleID.setErrors).toHaveBeenCalled();
  });

  it('should NOT mark as error if vehicleID is NOT duplicated in vehicle queue', () => {
    spyOn(component.form.controls.vehicleID, 'setErrors');
    const userInput: Vehicle = {
      vehicleID: 123,
      type: 'Motorcycle',
      space: 'small'
    };
    component.vehicles = of([userInput]);
    component.form.controls.vehicleID.setValue('124');
    expect(component.form.controls.vehicleID.setErrors).not.toHaveBeenCalled();
  });

  it('should mark as error if vehicleID is duplicated in waiting vehicle queue', () => {
    spyOn(component.form.controls.vehicleID, 'setErrors');
    const userInput: Vehicle = {
      vehicleID: 123,
      type: 'Motorcycle',
      space: 'small'
    };
    component.vehiclesWait = of([userInput]);
    component.form.controls.vehicleID.setValue('123');
    expect(component.form.controls.vehicleID.setErrors).toHaveBeenCalled();
  });

  it('should NOT mark as error if vehicleID is NOT duplicated in waiting vehicle queue', () => {
    spyOn(component.form.controls.vehicleID, 'setErrors');
    const userInput: Vehicle = {
      vehicleID: 123,
      type: 'Motorcycle',
      space: 'small'
    };
    component.vehiclesWait = of([userInput]);
    component.form.controls.vehicleID.setValue('124');
    expect(component.form.controls.vehicleID.setErrors).not.toHaveBeenCalled();
  });
});
