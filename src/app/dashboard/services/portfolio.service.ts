import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPortfolio } from '../../models/portfolio.model';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private apiURL = 'http://localhost:3000/api/portfolio';

  constructor(private _http: HttpClient) {}

  getProjects() {
    return this._http.get<IPortfolio[]>(this.apiURL);
  }

  addProject(formData: FormData) {
    return this._http.post<IPortfolio>(this.apiURL, formData);
  }

  updateProject(id: string, formData: FormData) {
    return this._http.put<IPortfolio>(`${this.apiURL}/${id}`, formData);
  }

  deleteProject(id: string) {
    return this._http.delete(`${this.apiURL}/${id}`);
  }
}
