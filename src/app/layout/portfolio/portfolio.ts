import { Component, OnInit } from '@angular/core';
import { IPortfolio } from '../../models/portfolio.model';
import { PortfolioService } from '../../dashboard/services/portfolio.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio implements OnInit {
  projects!:IPortfolio[]
  constructor(private portfolioService:PortfolioService){}
  ngOnInit(): void { this.portfolioService.getProjects().subscribe((data:IPortfolio[])=>{
    this.projects= data
  })
    
  }
  

}
