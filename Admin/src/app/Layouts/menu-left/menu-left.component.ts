import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-left',
  templateUrl: './menu-left.component.html',
  styleUrls: ['./menu-left.component.css'],
})
export class MenuLeftComponent {
  isProductOpen: boolean = false;

  toggleProduct() {
    this.isProductOpen = !this.isProductOpen;
    this.isBillOpen = false;
    this.isHumanOpen = false;
  }

  isBillOpen: boolean = false;

  toggleBill() {
    this.isBillOpen = !this.isBillOpen;
    this.isProductOpen = false;
    this.isHumanOpen = false;
  }

  isHumanOpen: boolean = false;

  toggleHuman() {
    this.isHumanOpen = !this.isHumanOpen;
    this.isBillOpen = false;
    this.isProductOpen = false;
  }

  isSettingOpen: boolean = false;

  toggleSetting() {
    this.isSettingOpen = !this.isSettingOpen;
    this.isHumanOpen = false;
    this.isBillOpen = false;
    this.isProductOpen = false;
  }
}
