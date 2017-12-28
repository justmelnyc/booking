import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hours',
  template: `
    <nav class="u-flex heading heading--borderedTop u-textAlignCenter">
            <!--<span class="u-flex1"></span>-->
            <ul class="heading-tabs">
                <li *ngFor="let time of times; let i = index"

                [ngClass]="{active: checkedOption === i}" class="heading-tabsItem u-inlineBlock">
                    <span class="u-flex1">
                <span
                 [attr.disabled]=' isBlocked(time.hour)'
                  [ngClass]="{'u-fontWeightMedium': false}"
                  class="heading-title u-inlineBlock u-fontWeightNormal">
                <a

                  [ngClass]="{'u-accentColor': step.isCompleted, red: isBlocked(time.hour) }"
                  class="button button--unstyled is-touched">{{ time.hour | time}}</a>
               </span>
                    </span>
                </li>
            </ul>
        </nav>
  `,
  styles: [`
  .heading-tabsItem {
    padding: 5px;

  }
    .button {
      border-radius: 5px;

    }
    .red {
     opacity: .5;
    }
  `]
})
export class HoursComponent implements OnInit {
  @Input() times;
  @Input() availableTimes;

    step = {
    isActive: false,
    isComplete: false
  };

  constructor() { }

  ngOnInit() {
    console.log(this.availableTimes)
  }
  isBlocked(time) {

    if (this.availableTimes.indexOf(time) > -1) {
      return true;
    }
    return false;
  }


}
