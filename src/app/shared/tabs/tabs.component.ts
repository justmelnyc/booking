import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tabs',
  template: `
  <div class="u-sizeFullHeight u-clearfix">
    <div class="container u-maxWidth1040">
        <header class="hero hero--standalone hero--compact hero--alignLeft u-clearfix u-maxWidth1040">
            <h1 class="hero-title">Schedule</h1>
            <!-- <div class="buttonSet" style="margin: 15px 0 0 auto;">
                <button [ngClass]="{'invalid' : !hasPrevStep, 'back' : hasPrevStep}" (click)="previous()" [disabled]="!hasPrevStep || !activeStep.showPrev" class="button button--withChrome u-baseColor--buttonNormal">Back</button>
                <button [ngClass]="{'active' : activeStep.isValid, 'invalid' : !activeStep.isValid, 'dead' : !hasNextStep}" (click)="next()" [disabled]="!activeStep.isValid" [hidden]="!hasNextStep || !activeStep.showNext" class="button button--withChrome u-baseColor--buttonNormal">Next</button>
            </div> -->
        </header>
        <nav class="u-flex heading heading--borderedTop u-textAlignCenter">
            <ul class="heading-tabs">
                <li *ngFor="let day of weekdays" (click)="select.emit(day)" [ngClass]="{'is-active': selectedDay === day}" class="heading-tabsItem u-inlineBlock">
                    <span class="u-flex1">
                        <span [ngClass]="{'u-fontWeightMedium': step.isActive}"
                              class="heading-title u-inlineBlock u-fontWeightNormal">
                              <a class="button button--unstyled is-touched">{{day}}</a>
                      </span>
                    </span>
                </li>
            </ul>
        </nav>
        <ng-content></ng-content>
    </div>
</div>`,
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @Input() weekdays;
  @Input() selectedDay;
  @Output() select = new EventEmitter<string>();
  step = {
    isActive: false,
    isDisabled: false,
    isComplete: false
  };

  constructor() { }

  ngOnInit() {
  }

}
