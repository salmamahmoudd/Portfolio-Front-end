import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { HomeService } from '../services/home.service';
import { IPhoto } from '../../models/photo.model';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeDashboard implements OnInit {
  
  homeItems: IPhoto[] = [];
  isEditMode: boolean = false;
  currentItem: IPhoto | null = null;
  selectedFile: File | null = null;

  model: IPhoto = {
    name: '',
    title: '',
    social: [
      { platform: 'facebook', url: '' },
      { platform: 'linkedin', url: '' },
      { platform: 'instagram', url: '' },
      { platform: 'github', url: '' }
    ],
    image: ''
  };

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.homeService.getAll().subscribe({
      next: (res) => this.homeItems = res,
      error: (err) => console.error('Error loading home items:', err)
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  addItem() {
    const formData = new FormData();
    formData.append('name', this.model.name);
    formData.append('title', this.model.title);
    formData.append('social', JSON.stringify(this.model.social));
    if (this.selectedFile) formData.append('image', this.selectedFile);

    this.homeService.add(formData).subscribe({
      next: () => {
        this.loadItems();
        this.resetForm();
      },
      error: (err) => console.error('Error adding item:', err)
    });
  }



  updateItem() {
    if (!this.currentItem) return;

    const formData = new FormData();
    formData.append('name', this.model.name);
    formData.append('title', this.model.title);
    formData.append('social', JSON.stringify(this.model.social));
    if (this.selectedFile) formData.append('image', this.selectedFile);

    this.homeService.update(this.currentItem._id!, formData).subscribe({
      next: () => {
        this.loadItems();
        this.cancelEdit();
      },
      error: (err) => console.error('Error updating item:', err)
    });
  }

  editItem(item: IPhoto) {
  this.isEditMode = true;
  this.currentItem = item;

  this.model = {
    name: item.name,
    title: item.title,
    social: JSON.parse(JSON.stringify(item.social)),
    image: item.image
  };

  this.selectedFile = null;
}

deleteItem(id: string | undefined) {
  if (!id) return;  
  this.homeService.delete(id).subscribe({
    next: () => this.loadItems(),
    error: (err) => console.error('Error deleting item:', err)
  });
}


  cancelEdit() {
    this.isEditMode = false;
    this.currentItem = null;
    this.resetForm();
  }

  resetForm() {
    this.model = {
      name: '',
      title: '',
      social: [
        { platform: 'facebook', url: '' },
        { platform: 'linkedin', url: '' },
        { platform: 'instagram', url: '' },
        { platform: 'github', url: '' }
      ],
      image: ''
    };
    this.selectedFile = null;
  }
}