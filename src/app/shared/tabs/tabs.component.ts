import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @Output() select = new EventEmitter<number>();
  step = {
    isActive: false,
    isDisabled: false,
    isComplete: false
  };

  constructor() { }

  ngOnInit() {
  }

}
