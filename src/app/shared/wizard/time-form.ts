import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from "@angular/core";
import {FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";

const TIME_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TimeFormComponent),
  multi: true
};
@Component({
  selector: 'time-form',
  template: `
    <section class="estimate-project__questions-section">
      <div class="container">
        <div class="row estimate-project__question-row">
          <div class="col-md-3 center-block">
            <div class="estimate-project__question-container">
              <p class="estimate-project__question">
                <span class="hs_cos_wrapper hs_cos_wrapper_widget hs_cos_wrapper_type_text">What time would you like?</span></p>
              <div class="estimate-project__question-number">
                3<span class="estimate-project__question-number-of">/4</span>
              </div>
            </div>
          </div>
        </div>

        <div class="row estimate-project__question-row" *ngIf="times; else loading">

          <div class="col-sm-3 col-md-3 center-block hour"
               *ngFor="let time of times; let i = index">
            <div class="estimate-project__checkbox"
                 (click)="onTimeSelect(time.hour, i); checkedOption = i"
                 [ngClass]="{active: checkedOption === i, disabled: isBooked(time.hour)}">
              <div class="estimate-project__checkbox__icon">
            <span class="hs_cos_wrapper hs_cos_wrapper_widget hs_cos_wrapper_type_image">
              <img class="hs-image-widget"
                   src="//www.netguru.co/hubfs/images/landing_pages/city/time_green_icon.png?t=1495524306439"
                   style="width:121px;border-width:0px;border:0px;" title="" width="121"></span>
              </div>
              <div class="estimate-project__checkbox__text">
                <span class="hs_cos_wrapper hs_cos_wrapper_widget hs_cos_wrapper_type_text">{{ time.hour | time }}</span>

              </div>
            </div>
          </div>
        </div>
        <ng-template #loading>
          <div class="loader"></div>
        </ng-template>
      </div>
    </section>
  `,
  styleUrls: ['time-form.scss'],
  providers: [TIME_VALUE_ACCESSOR]
})
export class TimeFormComponent implements OnInit {
  @Output() action = new EventEmitter<any>();
  @Input() times;
  @Input() bookedTimes;
  @Input() parent: FormGroup;
  // @Input() label;
  // @Input() tag;
  //checkedOption;
  value;
  onModelChange: Function = (_: any) => {
  }

  onModelTouched: Function = () => {
  }

  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }

  registerOnChange(fn) {
    this.onModelChange = fn;
  }

  writeValue(value) {
    this.value = value || 0;
  }
  isBooked(time) {
    if (this.bookedTimes.indexOf(time) > -1) {
      return true;
    }
    return false;
  }
  onTimeSelect(time, i) {
    // if (this.bookedTimes.indexOf(time) > -1) {
    //  return;
    // }
    // this.checkedOption = i;
    console.log('in form', time);
    if (this.value !== time) {
      this.writeValue(time);
      this.onModelChange(this.value);
      console.log(time);

    }
    this.onModelTouched();
  }

  ngOnInit() {

  }
}
