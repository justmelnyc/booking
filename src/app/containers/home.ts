import {Component, HostBinding, OnInit} from "@angular/core";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {Router} from "@angular/router";
import {routeFadeStateTrigger} from "../app.animations";
import {ServiceModalComponent, ModalService} from ".././shared/modal/index";
import {SharedModule} from "../shared/shared.module";
import {Service} from "../core/model/index";


@Component({
  selector: 'home',
  template: `
    <hero [type]="'jumbotron'" [background]="'assets/hero.png'">
      <hero-text 
        [heading]="'The eyes are windows to the soul'" 
        [subheading]="'The Rapture Startup is the one platform you need to build the business you’ve always dreamed of.'">
      </hero-text>
    </hero>
    <segment [title]="'Rapture is the easiest way to sell your products at events like fairs, pop ups & markets'"
             [subtitle]="'Choose and customize your site with over 160+ gorgeous content block types. Build and launch with ease with Slides'"
             [type]="'intro'">
      
    </segment>
    <segment [pretitle]="'Services'" [subtitle]="'You need to get that shit together'">
      <services [services]='services' (open)='serviceModal(service)'></services>
      <action [type]="'action'" [label]="'Book Now'" (action)='onAction()'></action>
    </segment>
    <segment [type]="'lovely'"
             [title]="'Some of the awesome people & companies that love The Rapture Startup'"
             [pretitle]="'Client Testimonials'">
      <testimonials></testimonials>
    </segment>
    
    <segment [title]="'Frequently Asked Questions'">
      <questions></questions>
      <action [type]="'action'" [label]="'Contact Us'" [tag]="'Do you have other question?'"></action>
    </segment>
  
    <segment [type]="'alternate'"
             [pretitle]="'Products'"
             [title]="'Sign up to interact with what matters most'"
             [subtitle]="'Great stories deserve a great audience'">
      <products></products>
      <action [type]="'action'" [label]="'See All Products'" (action)='onAction()'></action>
    </segment>
    <segment [type]="'flat'"
             [title]="'Frequently Asked Questions'"
             [subtitle]="'Great stories deserve a great audience'"
             [pretitle]="'Instafeed'" >
      <instafeed></instafeed>
    </segment>
    <segment [type]="'action'"
             [title]="'Save your spot now!'"
             [subtitle]="'Great stories deserve a great audience'">
      <action [type]="'lovely'" [label]="'Book Now'" (action)='onAction()'></action>
    </segment>

  `,
  animations: [
    routeFadeStateTrigger
  ],
  styles: [`
    :host {
      display: block;
    }
    .segment-action {
      background-color: #384368;
      color: #FFF;
    }
    .container {
      padding-top: 4em;
    }
  `]
})
export class HomeComponent implements OnInit {
  @HostBinding('@routeFadeState') routeAnimation = false;
  services: Service[] = [
    {
      'title': 'Organic Waxing',
      'price': 25,
      'description': 'Suddenly you are aware of every single thing that happens.',
      'type': 'Waxing',
      'img': '/assets/hands.jpg',
    },
    {
      'title': 'Total Tinting',
      'price': 30,
      'description': 'Play the game, or lose. But you’ll probably lose anyway.',
      'type': 'Shaping',
      'img': '/assets/hands.jpg',
    },
    {
      'title': 'Full Shaping',
      'price': 35,
      'description': 'Do you ever wake up wondering, “I’ve made a huge mistake”?',
      'type': 'Tinting',
      'img': '/assets/hands.jpg',
    }
  ];
  constructor(private router: Router,
              private modalService: ModalService,
              private slimLoadingBarService: SlimLoadingBarService) {
  }

  ngOnInit() {
    this.slimLoadingBarService.start();
    this.slimLoadingBarService.complete();
  }

  onAction() {
    this.router.navigate(['booking']);
  }
  serviceModal(service): void {
    console.log(service);
    const modal$ = this.modalService.create(SharedModule, ServiceModalComponent, {
      service,
      goToBooking: () => {
        this.router.navigate(['booking']);
      }
    });
  }

}
