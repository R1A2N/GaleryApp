// flask.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class FlaskService {
  private apiUrl = 'http://localhost:5000'; // Assurez-vous que l'URL correspond à votre serveur Flask

  constructor(private http: HttpClient) {}

  processImageData(nomImage: string): Observable<any> {
    const data = { nom_image: nomImage };
    console.log('Données envoyées :', data);
    return this.http.post<any>(`${this.apiUrl}/api/process_image_data`, data);
  }
  getImageDetails(nomImage: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/get_image_details/${nomImage}`);
  }}
