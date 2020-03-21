import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import {} from './parking-lot/parking-lot.module'

const routes: Routes = [
  {path: '', redirectTo: '/list', pathMatch: 'full'},
  {
    path: 'list',
    loadChildren: './parking-lot/parking-lot.module#ParkingLotModule'
  },
  // {path: '**', component: PageNotFoundComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
