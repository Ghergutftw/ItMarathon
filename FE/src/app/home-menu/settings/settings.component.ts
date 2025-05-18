import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
    standalone: true,
    selector: 'home-settings',
    imports: [FormsModule],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.css',
    encapsulation: ViewEncapsulation.None
})
export class SettingsComponent implements OnInit{
  selectedFont: string = '';
  selectedFontSize: string = '';

  ngOnInit() {
    const classList = document.body.classList;

    // Font family
    if (classList.contains('font-roboto')) {
      this.selectedFont = 'roboto';
    } else if (classList.contains('font-opensans')) {
      this.selectedFont = 'opensans';
    } else {
      this.selectedFont = 'arial'; // default
    }

    // Font size
    if (classList.contains('font-small')) {
      this.selectedFontSize = 'small';
    } else if (classList.contains('font-large')) {
      this.selectedFontSize = 'large';
    } else {
      this.selectedFontSize = 'medium'; // default
    }
  }

  changeFont(){
    const body = document.body;
    body.classList.remove('font-roboto', 'font-opensans', 'font-arial');

    if (this.selectedFont === 'roboto') {
      body.classList.add('font-roboto');
    } else if (this.selectedFont === 'opensans') {
      body.classList.add('font-opensans');
    } else {
      body.classList.add('font-arial'); // default
    }

    console.log('Body classes:', body.className);
  }

  changeFontSize() {
    const body = document.body;
    body.classList.remove('font-small', 'font-medium', 'font-large');

    if (this.selectedFontSize === 'small') {
      body.classList.add('font-small');
    } else if (this.selectedFontSize === 'large') {
      body.classList.add('font-large');
    } else {
      body.classList.add('font-medium'); // default
    }
  }

  changeName(){

  }

  changeEmail(){

  }
}
