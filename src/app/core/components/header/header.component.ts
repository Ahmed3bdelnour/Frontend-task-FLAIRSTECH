import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showNavBarContent: boolean = false;
  showCurrencyDropdown: boolean = false;
  showLanguageDropdown: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  /**
   * toggle navbar
   * @return {void}
   * @author Ahmed Abdelnour
   */
  toggleNavbar() {
    this.showNavBarContent = !this.showNavBarContent;
  }

  /**
   * toggle currency dropdown
   * @return {void}
   * @author Ahmed Abdelnour
   */
  toggleCurrencyDropdown() {
    this.showCurrencyDropdown = !this.showCurrencyDropdown;
  }

  /**
   * toggle langauge dropdown
   * @return {void}
   * @author Ahmed Abdelnour
   */
  toggleLanguageDropdown() {
    this.showLanguageDropdown = !this.showLanguageDropdown;
  }

}
