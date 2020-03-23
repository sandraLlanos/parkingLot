import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ParkingListComponent } from './parking-list.component';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import * as vehiclesReducer from '../../store/vehicle.reducers';
import { Store } from '@ngrx/store';
import { FlexLayoutModule } from '@angular/flex-layout';

export const reducers: ActionReducerMap<any> = {
  vehicles: vehiclesReducer.reducer
};

describe('ParkingListComponent', () => {
  let component: ParkingListComponent;
  let fixture: ComponentFixture<ParkingListComponent>;
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ParkingListComponent
      ],
      imports: [
        MatTableModule,
        MatCardModule,
        FlexLayoutModule,
        RouterTestingModule,
        StoreModule.forRoot(reducers)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingListComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should distpatch store when delete() function is called', () => {
    spyOn(window, 'confirm').and.returnValue(true)
    spyOn(store, 'dispatch');
    component.delete(123);
    expect(store.dispatch).toHaveBeenCalled();
  });
  it('should NOT distpatch store when delete() function is called', () => {
    spyOn(window, 'confirm').and.returnValue(false)
    spyOn(store, 'dispatch');
    component.delete(123);
    expect(store.dispatch).not.toHaveBeenCalled();  
  });
});
