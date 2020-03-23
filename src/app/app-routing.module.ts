import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/list', pathMatch: 'full'},
  {
    path: 'list',
    loadChildren: './parking-lot/parking-lot.module#ParkingLotModule'
  },
  {path: '**', pathMatch: 'full', redirectTo:'list'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
