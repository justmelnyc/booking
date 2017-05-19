import {Modal} from "./modal";
import {ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, ViewChild} from "@angular/core";

@Component({
  selector: "service-modal",
  styleUrls: ['modal-service.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="overlay overlay--dark" (click)="onClickedExit($event)">
      <div #modal class="overlay-dialog overlay-dialog--signin overlay-dialog--animate js-overlayDialog" tabindex="-1">
        <section class="u-maxWidth1000 u-marginAuto u-relative u-borderBox u-boxShadowThick js-subscriptionsForm">
          <div class="u-backgroundGrey u-sm-minHeight150 u-flex u-xs-flexWrap" style="min-height: 470px; text-align: left">
            <button (click)="onCloseClick()" class="button button--circle button--chromeless u-baseColor--buttonNormal button--withIcon button--withSvgIcon promo-dismissButton is-touched" title="Dismiss" aria-label="Dismiss">
            <span class="svgIcon svgIcon--removeThin svgIcon--29px">
              <svg class="svgIcon-use" width="29" height="29" viewBox="0 0 29 29">
                <path d="M20.13 8.11l-5.61 5.61-5.609-5.61-.801.801 5.61 5.61-5.61 5.61.801.8 5.61-5.609 5.61 5.61.8-.801-5.609-5.61 5.61-5.61" fill-rule="evenodd"></path>
              </svg>
            </span>
            </button>
            <div class="u-flex1 u-sizeHalfWidth u-borderBox u-padding40 u-xs-padding20 u-xs-marginBottom20 u-xs-sizeFullWidth">
              <h3 class="u-contentSerifBold u-lineHeightTight u-textColorWhite u-borderTopGreen u-borderBottomGreen u-paddingTop20 u-paddingBottom20 u-marginBottom30 u-xs-fontSize24 u-fontSize40">
                <span class="data">Heading</span> Service <br>
                on <span class="data">This is a {{service.title}}</span> <br>
                at <span class="data">Line Two</span>
              </h3>
              <p class="u-margin0 u-contentSansRegular u-letterSpacingNormal u-textColorTransparentWhiteDarker">Does this look correct?</p>
            </div>
            <div class="u-relative u-flex1 u-sizeHalfWidth u-minHeight250 u-xs-minHeight100 u-xs-sizeFullWidth js-paymentForm">
              <div class="u-flexColumn u-sizeFullHeight u-backgroundWhite u-borderBox u-paddingLeft30 u-paddingRight30 u-paddingTop40 u-paddingBottom40 u-xs-padding20">
                <div class="u-flex1">
                  <p class="u-fontSize18 u-contentSansRegular u-marginBottom40 u-xs-marginBottom20">Promo Text Here <strong>&amp; here.</strong></p>
                  <div class="creditCardForm creditCardForm--saved js-savedCard"></div>
                  <form class="u-sizeFullWidth creditCardForm creditCardForm--input" id="credit-card-form" name="credit-card-form">
                    <fieldset class="u-marginBottom15">
                      <label class="creditCardForm-heading u-block js-numberHeading">Credit card number
                        <button class="button button--lighter button--chromeless u-baseColor--buttonNormal button--withIcon button--withSvgIcon is-touched" data-action="show-cc-popover">
                          <label class="creditCardForm-heading u-block js-numberHeading">
                      <span class="svgIcon svgIcon--questionMark svgIcon--19px">
                        <svg class="svgIcon-use" height="19" viewbox="0 0 19 19" width="19">
									<path d="M9.5 18A8.5 8.5 0 1 0 9.499.999 8.5 8.5 0 0 0 9.5 18zm0-1a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"></path>
									<path d="M6.9 7.505h1.213c.053-.75.574-1.224 1.383-1.224.802 0 1.324.47 1.324 1.12 0 .59-.252.93-.96 1.36-.804.48-1.16 1.01-1.132 1.85l.006.45h1.213v-.36c0-.59.217-.9.973-1.34.773-.46 1.23-1.1 1.23-2 0-1.27-1.043-2.19-2.59-2.19-1.7 0-2.607 1.01-2.66 2.36zm2.514 6.305c.54 0 .902-.357.902-.89 0-.545-.363-.903-.902-.903-.54 0-.91.358-.91.903 0 .533.37.89.91.89z"></path></svg></span></label></button></label>
                      <div class="u-relative">
                        <div class="creditCardForm-icon js-cardIcon" style="left: 4px; top: 8px;"></div>
                        <input autocomplete="cc-number" class="textInput u-padding0 textInput--transparent textInput--underlined u-sizeFullWidth creditCardForm-number u-paddingLeft35 js-cardNumber" type="text">
                      </div>
                    </fieldset>
                    <div class="u-flexEnd">
                      <fieldset class="u-flex1 u-marginRight20">
                        <label class="creditCardForm-heading u-block js-expirationHeading">Expiration</label><input autocomplete="cc-exp" class="textInput u-padding0 textInput--transparent textInput--underlined u-sizeFullWidth creditCardForm-expiration js-cardExpiration" id="frmCCExp" placeholder="mm/yy" type="text">
                      </fieldset>
                      <fieldset class="u-flex1" style="min-width: 120px;">
                        <label class="creditCardForm-heading u-block js-cvcHeading">Security code <button class="button button--lighter button--chromeless u-baseColor--buttonNormal button--withIcon button--withSvgIcon" data-action="show-cvc-popover">
                          <label class="creditCardForm-heading u-block js-cvcHeading">
                      <span class="svgIcon svgIcon--questionMark svgIcon--19px">
                        <svg class="svgIcon-use" height="19" viewbox="0 0 19 19" width="19">
										<path d="M9.5 18A8.5 8.5 0 1 0 9.499.999 8.5 8.5 0 0 0 9.5 18zm0-1a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"></path>
										<path d="M6.9 7.505h1.213c.053-.75.574-1.224 1.383-1.224.802 0 1.324.47 1.324 1.12 0 .59-.252.93-.96 1.36-.804.48-1.16 1.01-1.132 1.85l.006.45h1.213v-.36c0-.59.217-.9.973-1.34.773-.46 1.23-1.1 1.23-2 0-1.27-1.043-2.19-2.59-2.19-1.7 0-2.607 1.01-2.66 2.36zm2.514 6.305c.54 0 .902-.357.902-.89 0-.545-.363-.903-.902-.903-.54 0-.91.358-.91.903 0 .533.37.89.91.89z"></path></svg></span></label></button></label>
                        <input autocomplete="cc-csc" class="textInput u-padding0 textInput--transparent textInput--underlined u-sizeFullWidth creditCardForm-cvc" type="text">
                      </fieldset>
                    </div>
                  </form>
                  <div class="u-marginTop20 u-height20">
                    <div class="creditCardForm creditCardForm--error u-marginBottom0 u-marginTop0 js-creditCardError"></div>
                  </div>
                </div>
                <div class="u-marginTop20">
                  <button type="button" class="button button--large button--withChrome" (click)="onGoToBooking($event)">Book Reservation</button>
                  <p style="text-align: left;" class="u-textColorNormal u-fontSize14 u-marginTop40 u-marginBottom0">By clicking "Start membership", you agree to our <a class="link link--underline u-baseColor--link" href="#" target="_blank">Subscription Terms of Service</a> and <a class="link link--underline u-baseColor--link" href="#" target="_blank">Privacy Policy</a>. The Lovely You will charge the membership ($5) to your payment method monthly until you cancel. There are no refunds or credits for partial months.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  `
})
@Modal()
export class ServiceModalComponent {
  @Input() service;
  ok: Function;
  destroy: Function;
  closeModal: Function;
  goToBooking: Function;
  @ViewChild('modal') modal: ElementRef;

  onCloseClick(): void {
    this.closeModal();
    this.destroy();
  }

  onClickedExit(event): void {
    if (event.path.indexOf(this.modal.nativeElement) === -1) {
      this.closeModal();
      this.destroy();
    }
  }
  onGoToBooking(event): void {
    this.goToBooking(event);
    this.closeModal();
    this.destroy();
  }
}
