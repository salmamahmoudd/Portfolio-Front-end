import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISkills } from '../../models/skills.models';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

 private apiURL = 'http://localhost:3000/api/skills';

  constructor(private _http: HttpClient) {}

  getSkills() {
    return this._http.get<ISkills[]>(this.apiURL);
  }

  addSkills(formData: FormData) {
    return this._http.post<ISkills>(this.apiURL, formData);
  }
  
  updateSkills(id: string, formData: FormData) {
    return this._http.put<ISkills>(`${this.apiURL}/${id}`, formData);
  }
  deleteSkills(id: string) {
    return this._http.delete<ISkills>(`${this.apiURL}/${id}`);
  }

 

}
