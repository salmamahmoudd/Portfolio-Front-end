import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPhoto } from '../../models/photo.model'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class HomeService {
 private apiURL = 'http://localhost:3000/api/home'; 

  constructor(private _http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this._http.get<IPhoto[]>(this.apiURL);
  }

  add(formData: FormData): Observable<IPhoto> {
    return this._http.post<IPhoto>(this.apiURL, formData);
  }

  update(id: string, formData: FormData): Observable<IPhoto> {
    return this._http.put<IPhoto>(`${this.apiURL}/${id}`, formData);
  }

  delete(id: string): Observable<any> {
    return this._http.delete(`${this.apiURL}/${id}`);
  }
}



