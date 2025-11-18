import { SkillsService } from './../../dashboard/services/skills.service';
import { Component, OnInit } from '@angular/core';
import { ISkills } from '../../models/skills.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills implements OnInit {

  skills!:ISkills[]
  constructor(private skillsService:SkillsService){}
  ngOnInit(): void {
    this.skillsService.getSkills().subscribe
    ((data:ISkills[])=>{
      this.skills =data
    })
  }

}
