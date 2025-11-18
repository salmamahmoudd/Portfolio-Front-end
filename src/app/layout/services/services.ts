import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IServices } from '../../models/services.model';
import { ServicesService } from '../../dashboard/services/services.service';

@Component({
  selector: 'app-services',
  imports: [CommonModule],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services implements OnInit {
  services: IServices[] = []; 

  constructor(private servicesService: ServicesService) {}

  ngOnInit(): void {
    this.servicesService.getServices().subscribe((data: IServices[]) => {
      this.services = data;
    });
  }
}
