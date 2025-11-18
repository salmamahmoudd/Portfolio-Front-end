import { Component, OnInit } from '@angular/core';
import { SkillsService } from '../services/skills.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class SkillsDashboard implements OnInit {

  myForm: FormGroup;
  skills: any[] = [];
  selectedFile: File | null = null;
  isEditMode: boolean = false;
  selectedSkillId: string | null = null;

  constructor(private _skillsService: SkillsService) {
    this.myForm = new FormGroup({
      title: new FormControl(''),
      image: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.loadSkills();
  }

  loadSkills() {
    this._skillsService.getSkills().subscribe(res => {
      this.skills = res;
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.myForm.patchValue({ img: this.selectedFile });
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.myForm.get('title')?.value);
    if (this.selectedFile) formData.append('image', this.selectedFile);

    if (this.isEditMode && this.selectedSkillId) {
      this._skillsService.updateSkills(this.selectedSkillId, formData)
        .subscribe(() => {
          this.cancelEdit();
          this.loadSkills();
        });
    } else {
      this._skillsService.addSkills(formData).subscribe(() => {
        this.myForm.reset();
        this.selectedFile = null;
        this.loadSkills();
      });
    }
  }

  editSkill(skill: any) {
    this.isEditMode = true;
    this.selectedSkillId = skill._id;
    this.myForm.patchValue({
      title: skill.title,
    });
    this.selectedFile = null;
  }

  deleteSkill(id: string) {
    this._skillsService.deleteSkills(id).subscribe(() => {
      this.loadSkills();
    });
  }

  cancelEdit() {
    this.isEditMode = false;
    this.selectedSkillId = null;
    this.myForm.reset();
    this.selectedFile = null;
  }

}