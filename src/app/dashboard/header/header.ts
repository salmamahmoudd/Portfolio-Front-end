import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [NgStyle,RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
responsiveMenu: any = {
  left: '-250px'
};
isOpen = false;
openNav() {
  this.isOpen = !this.isOpen;
  this.responsiveMenu = {
    left: this.isOpen ? '0' : '-250px'
  };
}
}
