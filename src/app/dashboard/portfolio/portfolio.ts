import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IPortfolio } from '../../models/portfolio.model';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../services/portfolio.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-portfolio-dashboard',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterLink],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})

export class PortfolioDashboard implements OnInit {
  
 projects: any[] = [];
  model = { title: '', link: '' };
  selectedFile: File | null = null;
  isEditMode: boolean = false;
  selectedProjectId: string | null = null;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.portfolioService.getProjects()
      .subscribe(res => this.projects = res);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  addProject() {
    const formData = new FormData();
    formData.append('title', this.model.title);
    formData.append('link', this.model.link);
    if (this.selectedFile) formData.append('image', this.selectedFile);

    this.portfolioService.addProject(formData)
      .subscribe(() => {
        this.model = { title: '', link: '' };
        this.selectedFile = null;
        this.loadProjects();
      });
  }

  editProject(project: any) {
    this.isEditMode = true;
    this.selectedProjectId = project._id;
    this.model.title = project.title;
    this.model.link = project.link;
  }

  updateProject() {
    if (!this.selectedProjectId) return;

    const formData = new FormData();
    formData.append('title', this.model.title);
    formData.append('link', this.model.link);
    if (this.selectedFile) formData.append('image', this.selectedFile);

    this.portfolioService.updateProject(this.selectedProjectId, formData)
      .subscribe(() => {
        this.cancelEdit();
        this.loadProjects();
      });
  }

  deleteProject(id: string) {
    this.portfolioService.deleteProject(id)
      .subscribe(() => this.loadProjects());
  }

  cancelEdit() {
    this.isEditMode = false;
    this.selectedProjectId = null;
    this.model = { title: '', link: '' };
    this.selectedFile = null;
  }

}