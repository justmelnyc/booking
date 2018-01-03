import { async } from '@angular/core/testing';
import { ScheduleService } from './../core/service/schedule';
import {Component, HostBinding, OnInit, OnDestroy} from "@angular/core";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {routeFadeStateTrigger} from "../app.animations";
import {Router} from "@angular/router";
import {ReservationService} from "../core/service/res";
import { getTime } from 'date-fns';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'times',
  template: `
  <div class='container' style="padding-top: 6em">
  <tabs (select)="setDay($event)"
  [weekdays]='weekdays'
  [selectedDay]='selectedDay'>
  <hours
    [times]='times | async'
    [availableTimes]='blockedTimes'
    (block)="scheduleService.blockTime($event)">
  </hours>
  <hours
    [times]='times | async'
    [availableTimes]='blockedTimes'
    (block)="scheduleService.blockTime($event)">
  </hours>
  </tabs>
  <pre> {{ blockedTimes }} </pre>
   <pre> {{ scheduleService.selectedDay$ | async }} </pre>

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
  newTimes;
  fbTimes;
  blockedTimes;
  selectedDay;
  day;
  error;
  subscription: Subscription;
  weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  constructor(private scheduleService: ScheduleService, private reservationService: ReservationService, private router: Router, private slimLoadingBarService: SlimLoadingBarService) {
  }

  ngOnInit() {
    this.slimLoadingBarService.start();
    this.times = this.reservationService.getAllSlots();
    this.subscription = this.scheduleService.selectedDay$
       .subscribe(day => {
         this.selectedDay = day;
       });
       this.newTimes = this.scheduleService.getTimesList2()
;
    this.slimLoadingBarService.complete();
    console.log(this.fbTimes);
    this.getTimes(this.selectedDay);
  }



  setDay(day): void {
    console.log(day);
    this.scheduleService.updateDay(day);
    this.getTimes(this.selectedDay);
  }
  onAction() {
    this.router.navigate(['booking']);
  }

   getTimes(event) {
    console.log('this right here', event);
    this.scheduleService.getDayTimes(event).subscribe(times => {
      this.blockedTimes = times.map(time => {
        return time.$value;
      });
    });
  }
  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }
}
