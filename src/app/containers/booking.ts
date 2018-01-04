import {Component, HostBinding, OnInit} from "@angular/core";
// import {CalendarEvent} from "../schedule/utils/calendar-utils";
import {CalendarDateFormatter, CalendarMonthViewDay, DateFormatterParams} from "angular-calendar";
import * as CalendarUtils from "../core/utils/calendar.utils";
import {
  addDays,
  addHours,
  addMonths,
  addWeeks,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isSunday,
  isWeekend,
  isMonday,
  isTuesday,
  isWednesday,
  isThursday,
  isFriday,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
  isSaturday,
  isWithinRange,
  isDate
} from "date-fns";
import * as RootStore from "../store";
import {Store} from "@ngrx/store";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReservationsActions} from "../store/actions/res";
import {ReservationService} from "../core/service/res";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {routeFadeStateTrigger} from "../app.animations";
// import swal from 'sweetalert2';
import { Router } from '@angular/router';
import * as _ from 'lodash';
// declare swal: any;
declare var swal:any;
class CustomDateFormatter extends CalendarDateFormatter {

  public monthViewColumnHeader({date, locale}: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {weekday: 'short'}).format(date); // use short week days
  }

}


type CalendarPeriod = 'day' | 'week' | 'month';

@Component({
  selector: 'booking',
  template: `
    <!--<hero [background]="'assets/lite-min.jpg'"></hero>-->

    <div class="u-foreground homeContainer-content u-marginAuto u-clearfix u-sizeViewHeightMin100">
      <div class="container"  style="padding-top: 6em">
        <section>
          <loadingspinner *ngIf="loading"></loadingspinner>
          <div class="wizard">
            <form-wizard [formGroup]="reservationForm" (onStepChanged)="onStepChanged($event)">
              <wizard-step
                [isValid]="!reservationForm.controls['service'].untouched"
                [title]=" data?.service?.type ||'Pick Service'"
                [stepTitle]="'Step One'"
                [stepTagline]="'Select the method you prefer'"
                [stepHeading]="'All Three are Organic'"
                (onNext)="onStep1Next($event)">
                <service-form [parent]="reservationForm" formControlName="service"></service-form>
              </wizard-step>
              <wizard-step
                [isValid]="!reservationForm.controls['reservationDate'].untouched"
                [title]=" (data?.reservationDate | date :'EEEE')  ||'Pick Date'"
                [stepTitle]="'Step Two'"
                [stepTagline]="'What day would you like'"
                [stepHeading]="'Everyday but Sunday'"
                [showNext]="step2.showNext"
                [showPrev]="step2.showPrev"
                (onNext)="onStep2Next($event)">

                <day-form formControlName="reservationDate" [parent]="reservationForm"
                               [dayModifier]="dayModifier"
                               [viewDate]="viewDate"
                               (dayClicked)="dayClicked($event.day)">
                </day-form>
              </wizard-step>
              <wizard-step
                [isValid]="!reservationForm.controls['reservationTime'].untouched"
                [title]=" (data?.reservationTime | time) || 'Pick Time'"
                [stepTitle]="'Step Three'"
                [stepTagline]="'What time would you like'"
                [stepHeading]="'Sessions are an hour long'"
                (onNext)="onStep3Next($event)">
                <time-form formControlName="reservationTime" [day]='data.reservationDate' [times]='times | async' [bookedTimes]='bookedTimesNew'></time-form>
              </wizard-step>
              <wizard-step
                [isValid]="this.data && this.data.creditDetail && this.data.creditDetail.valid"
                [title]="'Payment'"
                [stepTitle]="'Step Four'"
                [stepTagline]="'Review your answers and Pay with Credit Card'"
                [stepHeading]="'Payment Is Secure'">
                <div [ngSwitch]="isCompleted">
                  <div *ngSwitchDefault>
                    <credit-form formControlName="creditDetail" [user]="user | async" [data]='data' (onComplete)="onComplete($event)"></credit-form>
                  </div>
                  <div *ngSwitchCase="true">
                    <success-form [user]="user | async" [data]='data'></success-form>
                  </div>
                </div>
              </wizard-step>
            </form-wizard>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    :host {display: block;}
    .container, .u-foreground, .homeContainer-content, .u-marginAuto, .u-clearfix, .u-sizeViewHeightMin100 {}
    .wizard {min-height: 750px;height: 100%;}
  `],
  animations: [
    routeFadeStateTrigger
  ],
  providers: [{
    provide: CalendarDateFormatter,
    useClass: CustomDateFormatter
  }]
})
export class BookingComponent implements OnInit {
  @HostBinding('@routeFadeState') routeAnimation = true;
  viewDate: Date = new Date();
  view: CalendarPeriod = 'month';

  step = {
    stepTitle : 'Step One',
    stepTagline : 'Select the method you prefer',
    stepHeading : 'All Three are Organic',
  };
  reservations$;
  reservationForm: FormGroup;
  activeDayIsOpen = false;

  reservationDay;
  selectedDay;
  step2: any = {
    showNext: true,
    showPrev: true
  };

  loading = false;
  times;
  bookedTimes = [];

  bookedTimesNew = [];

  user;
  data: any = {};

  minDate: Date = subDays(new Date(), 1);

  maxDate: Date = addWeeks(new Date(), 2);

  dayModifier: Function;

  prevBtnDisabled = false;

  nextBtnDisabled = false;

  isCompleted = false;

  filtered;
  dates = [
new Date(2018, 0, 12),
new Date(2018, 0, 13),
new Date(2018, 0, 11)];

  thurAtFour = new Date(2017, 8, 7);
  tomorrow = new Date(2017, 10, 16);

  wedding1 = new Date(2018, 1, 3);
  wedding2 = new Date(2018, 1, 4);



  thisWednesday = new Date(2017, 10, 16);

  startDate = new Date(2017, 10, 6);
  endDate = new Date(2017, 10, 7);

  twentyFirst = new Date(2017, 11, 21);

  constructor(private reservationsActions: ReservationsActions,
              private fb: FormBuilder,
              private _router: Router,
              private reservationService: ReservationService,
              private slimLoadingBarService: SlimLoadingBarService,
              private store: Store<RootStore.AppState>) {
    this.dayModifier = function (day: Date): string {
      if (!this.dateIsValid(day) || isSunday(day) || isMonday(day) || isTuesday(day) || isSameDay(day, this.wedding1) || isSameDay(day, this.wedding2) || this.dateBlocked(day)) {
        // day.cssClass = 'cal-disabled';
        return 'disabled';
      }
      return '';
    }.bind(this);
    this.dateOrViewChanged();
  }

  setDay() {
    // console.log('today is', this.viewDate);
    this.reservationService.updateDay(this.viewDate);
  }

  dateBlocked(date) {
    return this.dates.some(d => +d === +date);
  }

  onStep1Next(event) {
    console.log(this.data, 'Step1 - Next');
    console.log(this.bookedTimes);
    // this.stepNumber = 'Step Two';
    // console.log("Hello", swal.isVisible());
    // swal.showLoading();
    // if(swal.isVisible()) { // instant regret
    //  swal.close();
    // }
    // sweetAlert.swal.showLoading();
  }

  // onStep2Next(event) {
  //   this.reservationService.getReservationsForDay(this.data.reservationDate).subscribe(reservations => {
  //     this.bookedTimes = reservations.map(reservation => {
  //       console.log(reservation);
  //       return reservation.reservationTime;
  //     });
  //     // if (this.data.reservationDate) {
  //     //   if (isTuesday(this.data.reservationDate) || isWednesday(this.data.reservationDate) || isThursday(this.data.reservationDate)) {
  //     //     this.bookedTimesNew = _.concat(this.bookedTimes, [10, 11, 12, 13, 14, 15, 16]);
  //     //     console.log(this.bookedTimesNew);
  //     //   } else {
  //     //     this.bookedTimesNew = _.concat(this.bookedTimes, []);
  //     //     console.log(this.bookedTimesNew);
  //     //   }
  //     // }
  //   });
  // }

  // onStep2Next(event) {
  //   console.log(this.bookedTimes);
  //   this.reservationService.getReservationsForDay(this.data.reservationDate).subscribe(reservations => {
  //     this.bookedTimes = reservations.map(reservation => {
  //       return reservation.reservationTime;
  //     });
  //   });
  // }

  onStep2Next(event) {
    console.log('Step2 - Next');
    // this.stepNumber = 'Step Three';
    // This is after selecting day
    this.reservationService.getReservationsForDay(this.data.reservationDate).subscribe(reservations => {

      this.bookedTimes = reservations.map(reservation => {
        // console.log(reservation);
        return reservation.reservationTime;
      });
      if (this.data.reservationDate) {
            if (isSameDay(this.data.reservationDate, this.twentyFirst)) {
              this.bookedTimesNew = _.concat(this.bookedTimes, [9, 10, 11, 15, 16, 17, 18, 19]);
            } else if (isWednesday(this.data.reservationDate) || isThursday(this.data.reservationDate) ) {
              this.bookedTimesNew = _.concat(this.bookedTimes, [9, 10, 11, 17, 18]);
            } else {
              this.bookedTimesNew = _.concat(this.bookedTimes, []);
              // console.log(this.bookedTimesNew);
            }
          }
    });
  }

  onStep3Next(event) {
    console.log(this.bookedTimes);
    // console.log('Step3 - Next');
  }

  onStep4Next(event) {
    // console.log('Step4 - Next');
  }
  onComplete(event) {
    this.slimLoadingBarService.start();
    const _this = this;
    this.loading = true;
    (<any>window).Stripe.card.createToken({
      number: this.reservationForm.value['creditDetail'].cardNumber,
      exp: this.reservationForm.value['creditDetail'].expireDate,
      cvc: this.reservationForm.value['creditDetail'].cvc
    }, (status: number, response: any) => {
      if (status === 200) {
        console.log(`Success! Card token ${response.card.id}.`);
        console.log('card response', response);

        _this.reservationService.bookUserReservation(_this.reservationForm.value, response.id, _this.data.service.price )
          .subscribe(
            () => {
              _this.loading = false;
              _this.isCompleted = true;
              _this.slimLoadingBarService.complete();
              swal('Awesome', 'You Have Successfully booked an appointment', 'success');
              _this.reservationForm.reset();
              _this._router.navigate(['/']);
            },
            err => {
              // this.isCompleted = true;
              console.log(`error creating reservation ${err}`);
              _this.loading = false;

              swal('Oops...', err.message || err._body, 'error');

              _this.slimLoadingBarService.complete();
            }
          );
        // this.save(this.reservationForm);
      } else {
        console.log("ERROR", response.error);
        _this.loading = false;
        swal('Oops...', response.error.message, 'error');
        _this.slimLoadingBarService.complete();
      }
    });
  }

  onStepChanged(step) {
    this.step.stepTitle = step.stepTitle;
    this.step.stepTagline = step.stepTagline;
    this.step.stepHeading = step.stepHeading;
    console.log('Changed to ' + step.title);
  }

  ngOnInit() {
    // this.store.dispatch(this.reservationsActions.loadReservations());
    this.slimLoadingBarService.start();
    this.times = this.reservationService.getAllSlots();
    this.filtered = this.getThisDay(this.viewDate);
    // console.log('filtered is', this.filtered);
    console.log('times', this.times);

    this.user = this.store.select(state => state.authState.currentUser);


    this.reservationService.loadReservations();

    // this.slots$ = this.reservationService.getSlotsAvailable();

    this.reservations$ = this.store.select(state => state.reservationState.reservations);

    this.reservationForm = this.fb.group({
      service: ['', Validators.required],
      reservationDate: ['', Validators.required],
      reservationTime: ['', Validators.required],
      creditDetail: ['', Validators.required],
      createdDate: [new Date()]
    });
    this.reservationForm.valueChanges.subscribe(data => {
      this.data = {
        service: data.service,
        reservationDate: data.reservationDate,
        reservationTime: data.reservationTime,
        creditDetail: data.creditDetail,
        name: this.user.displayName,
        email: this.user.email,
      };
    });
    this.slimLoadingBarService.complete();
  }

  getThisDay(day) {
    return this.reservationService.loadReservationsOnDay(day);
  }

  dayClicked(day: Date): void {
    // if (this.selectedDay) {
    //  delete this.selectedDay.cssClass;
    // }
    // this.setDay();
    // day.cssClass = 'cal-day-selected';
    // this.selectedDay = day;
    this.viewDate = day;
    this.reservationDay = day; // this.selectedDay;
    console.log("hala day", day);
    // console.log(this.selectedDay, this.reservationDay)
  }

  increment(): void {
    this.changeDate(CalendarUtils.addPeriod(this.view, this.viewDate, 1));
  }

  decrement(): void {
    this.changeDate(CalendarUtils.subPeriod(this.view, this.viewDate, 1));
  }

  today(): void {
    this.changeDate(new Date());
  }

  dateIsValid(date: Date): boolean {
    return date >= this.minDate && date <= this.maxDate;
  }
  dateIsBlocked(date: Date): boolean {
    return date >= this.minDate && date <= this.maxDate;
  }

  changeDate(date: Date): void {
    this.viewDate = date;
    this.dateOrViewChanged();
  }

  changeView(view: CalendarPeriod): void {
    this.view = view;
    this.dateOrViewChanged();
  }

  dateOrViewChanged(): void {
    this.prevBtnDisabled = !this.dateIsValid(CalendarUtils.endOfPeriod(this.view, CalendarUtils.subPeriod(this.view, this.viewDate, 1)));
    this.nextBtnDisabled = !this.dateIsValid(CalendarUtils.startOfPeriod(this.view, CalendarUtils.addPeriod(this.view, this.viewDate, 1)));
    if (this.viewDate < this.minDate) {
      this.changeDate(this.minDate);
    } else if (this.viewDate > this.maxDate) {
      this.changeDate(this.maxDate);
    }
  }


}
