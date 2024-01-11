// image.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private baseUrl = 'http://localhost:8080'; // Remplacez par votre URL backend

  constructor(private http: HttpClient) { }

  uploadImage(catalogueId: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders();
    // headers.set('Authorization', 'Bearer ' + token); // Ajoutez un en-tête d'authentification si nécessaire

    return this.http.post(`${this.baseUrl}/upload/${catalogueId}`, formData, { headers });
  }
}
