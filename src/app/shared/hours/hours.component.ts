import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hours',
  template: `
    <nav class="u-flex heading heading--borderedTop u-textAlignCenter">
            <!--<span class="u-flex1"></span>-->
            <ul class="heading-tabs">
                <li *ngFor="let time of times; let i = index"
                    class="heading-tabsItem u-inlineBlock active">
                    <span class="u-flex1">
                <span
                 [attr.disabled]=' isBlocked(time.hour)'
                  [ngClass]="{'u-fontWeightMedium': false}"
                  class="heading-title u-inlineBlock u-fontWeightNormal"
                  (click)='block.emit(time.hour)'>
                <a
                  [ngClass]="{'u-accentColor': step.isCompleted, blocked: isBlocked(time.hour) }"
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
      color: rgba(0, 0, 0, 0.50);
      border-color: rgba(0, 0, 0, 0.50);

    }
    .blocked {
     opacity: .5;
     background-color: rgba(0, 0, 0, 0.10);
    }
  `]
})
export class HoursComponent implements OnInit {
  @Input() times;
  @Input() availableTimes;
  @Output() block = new EventEmitter<number>();

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
