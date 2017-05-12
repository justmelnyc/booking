import {Popover} from "./popover";
import {ChangeDetectionStrategy, Component} from "@angular/core";

const template = `
  <div class="popover-menu-container" (click)="onClickedExit()">
    <div class="overlay-inner">
		<div class="popover js-popover popover--menu popover--userActions popover--globalNav u-resetSpectrum popover--bottom is-active popover-menu-content" style="">
			<div class="popover-inner">
				<ul class="list list--borderless list--short list--large" role="menu">
					<li class="list-item list-item--dark u-padding0">
						<a class="button button--dark button--chromeless u-baseColor--buttonDark" href="#" role="menuitem">New story</a>
					</li>
					<li class="list-item list-item--dark u-padding0">
						<a class="button button--dark button--chromeless u-baseColor--buttonDark" href="#">Stories</a>
					</li>
					<li class="list-item list-item--dark u-padding0">
						<a class="button button--dark button--chromeless u-baseColor--buttonDark" href="#">Series</a>
					</li>
					<li class="list-item list-item--dark u-padding0">
						<a class="button button--dark button--chromeless u-baseColor--buttonDark" href="#">Stats</a>
					</li>
					<li class="list-item list-item--separator"></li>
					<li class="list-item list-item--dark u-padding0">
						<a class="button button--dark button--chromeless u-baseColor--buttonDark" href="#">Bookmarks</a>
					</li>
					<li class="list-item list-item--dark u-padding0">
						<a class="button button--dark button--chromeless u-baseColor--buttonDark" href="#">Publications</a>
					</li>
					<li class="list-item list-item--dark u-padding0">
						<a class="button button--dark button--chromeless u-baseColor--buttonDark" href="#">Customize your interests</a>
					</li>
					<li class="list-item list-item--separator"></li>
					<li class="list-item u-padding0">
						<a class="button button--dark button--chromeless u-baseColor--buttonDark" href="#">Profile</a>
					</li>
					<li class="list-item u-padding0">
						<a class="button button--dark button--chromeless u-baseColor--buttonDark" href="#">Settings</a>
					</li>
					<li class="list-item u-padding0">
						<a class="button button--dark button--chromeless u-baseColor--buttonDark" href="#" target="_blank">Help</a>
					</li>
					<li class="list-item u-padding0">
						<a (click)='onSignOut()' class="button button--dark button--chromeless u-baseColor--buttonDark" href="#">Sign out</a>
					</li>
				</ul>
			</div>
			<div class="popover-arrow" style=""></div>
		</div>
		</div>
	</div>
`;

@Component({
  selector: "popover-menu",
  styleUrls: ['popover-menu.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template
})
@Popover()
export class PopoverMenuComponent {
  ok: Function;
  destroy: Function;
  closePopover: Function;
  signOut: Function;

  onClickedExit(): void {
    this.closePopover();
    this.destroy();
  }

  onSignOut(): void {
    this.signOut();
  }

  onOk(): void {
    this.closePopover();
    this.destroy();
  }
}
