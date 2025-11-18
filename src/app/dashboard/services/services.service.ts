import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IServices } from '../../models/services.model';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private apiURL = 'http://localhost:3000/api/services';

  constructor(private _http: HttpClient) {}

  getServices() {
    return this._http.get<IServices[]>(this.apiURL);
  }

  addServices(formData: FormData) {
    return this._http.post<IServices>(this.apiURL, formData);
  }

  updateServices(id: string, formData: FormData) {
    return this._http.put<IServices>(`${this.apiURL}/${id}`, formData);
  }

  deleteServices(id: string) {
    return this._http.delete(`${this.apiURL}/${id}`);
  }
}
