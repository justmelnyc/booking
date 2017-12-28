import { async } from '@angular/core/testing';
import { ScheduleService } from './../core/service/schedule';
import {Component, HostBinding, OnInit} from "@angular/core";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {routeFadeStateTrigger} from "../app.animations";
import {Router} from "@angular/router";
import {ReservationService} from "../core/service/res";

@Component({
  selector: 'times',
  template: `
  <div class='container' style="padding-top: 6em">
  <tabs>
  <hours [times]='times | async' [availableTimes]='availableTimes'></hours>
  </tabs>

  </div>
  `,
  styles: [``],
  animations: [
    routeFadeStateTrigger
  ]
})
export class TimesComponent implements OnInit {
  @HostBinding('@routeFadeState') routeAnimation = false;
  times;
  availableTimes = [9, 10, 12];
  constructor(private scheduleService: ScheduleService, private reservationService: ReservationService, private router: Router, private slimLoadingBarService: SlimLoadingBarService) {
  }

  ngOnInit() {
    this.slimLoadingBarService.start();
    this.times = this.reservationService.getAllSlots();
    // this.AvailableTimes = this.scheduleService.getDayTimes('monday');
    this.slimLoadingBarService.complete();
    console.log(this.times);
  }
  onAction() {
    this.router.navigate(['booking']);
  }
}
