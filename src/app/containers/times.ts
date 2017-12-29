import { async } from '@angular/core/testing';
import { ScheduleService } from './../core/service/schedule';
import {Component, HostBinding, OnInit} from "@angular/core";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {routeFadeStateTrigger} from "../app.animations";
import {Router} from "@angular/router";
import {ReservationService} from "../core/service/res";
import { getTime } from 'date-fns';

@Component({
  selector: 'times',
  template: `
  <div class='container' style="padding-top: 6em">
  <tabs (select)="setDay($event)">
  <hours
    [times]='times | async'
    [availableTimes]='blockedTimes'
    (block)="scheduleService.blockTime($event)">
  </hours>
  </tabs>
  <pre> {{ blockedTimes }}</pre>

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
  fbTimes;
  blockedTimes;
  constructor(private scheduleService: ScheduleService, private reservationService: ReservationService, private router: Router, private slimLoadingBarService: SlimLoadingBarService) {
  }

  ngOnInit() {
    this.slimLoadingBarService.start();
    this.times = this.reservationService.getAllSlots();
    //  this.fbTimes = this.scheduleService.getDayTimes('monday');
    // this.AvailableTimes = this.scheduleService.getDayTimes('monday');
    this.slimLoadingBarService.complete();
    console.log(this.fbTimes);
    this.getTimes(this.scheduleService.selectedDay$);
  }


  setDay(day): void {
    console.log(day);
    this.scheduleService.updateDay(day);
  }
  onAction() {
    this.router.navigate(['booking']);
  }

   getTimes(event) {
    console.log(event);
    this.scheduleService.getDayTimes('monday').subscribe(times => {
       console.log(times);
      this.blockedTimes = times.map(time => {
        return time.$value;
      });
    });
  }
}
