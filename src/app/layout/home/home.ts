import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { IPhoto } from '../../models/photo.model';
import { HomeService } from '../../dashboard/services/home.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink,NgClass],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  home: any = {
    name: '',
    title: '',
    social: [],
    image: ''
  };

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.loadHome();
  }

  loadHome() {
    this.homeService.getAll().subscribe({
      next: (res) => {
        this.home = res[0] || this.home;
      },
      error: (err) => console.error('Error loading home data:', err)
    });
  }

}
