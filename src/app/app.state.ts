import * as fromVehicles from './store/vehicle.reducers';

export interface AppState {
  users: fromVehicles.State;
}
