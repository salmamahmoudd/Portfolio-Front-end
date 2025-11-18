import { Services } from './../../layout/services/services';
import { Component, OnInit } from '@angular/core';
import { ServicesService } from './services.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  imports: [ReactiveFormsModule, FormsModule,CommonModule,RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class ServicesDashboared implements OnInit {
  services: any[] = [];
  model = { title: '', name: '' };
  selectedFile: File | null = null;
  isEditMode: boolean = false;
  selectedServiceId: string | null = null;

  constructor(private servicesService: ServicesService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices() {
    this.servicesService.getServices()
      .subscribe(res => this.services = res);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

addServices() {
  const formData = new FormData();
  formData.append('title', this.model.title);
  formData.append('name', this.model.name);
  if (this.selectedFile) formData.append('image', this.selectedFile);

  this.servicesService.addServices(formData).subscribe(() => {
    this.model = { title: '', name: '' };
    this.selectedFile = null;
    this.loadServices();
  });
}


  editServices(service: any) {
    this.isEditMode = true;
    this.selectedServiceId = service._id;
    this.model.title = service.title;
    this.model.name = service.name;
  }

  updateServices() {
    if (!this.selectedServiceId) return;

    const formData = new FormData();
    formData.append('title', this.model.title);
    formData.append('name', this.model.name); // صححتها
    if (this.selectedFile) formData.append('image', this.selectedFile);

    this.servicesService.updateServices(this.selectedServiceId, formData)
      .subscribe(() => {
        this.cancelEdit();
        this.loadServices();
      });
  }

  deleteServices(id: string) {
    this.servicesService.deleteServices(id)
      .subscribe(() => this.loadServices());
  }

  cancelEdit() {
    this.isEditMode = false;
    this.selectedServiceId = null;
    this.model = { title: '', name: '' };
    this.selectedFile = null;
  }

}
  


