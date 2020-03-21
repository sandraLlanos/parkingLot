import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parking-lot',
  template: `
  <div class="row message" 
  [ngClass]="{'hide-message': !showMessage}">
    <div class="col-sm-12">
      {{message}}
      <span (click)="showMessage=false;">x</span>
    </div>
  </div>
    <router-outlet></router-outlet>`,
  styleUrls: ['./parking-lot.component.scss']
})
export class ParkingLotComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
