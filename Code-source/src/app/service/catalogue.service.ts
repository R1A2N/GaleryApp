// catalogue.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// @ts-ignore
import { Catalogue } from '../models/catalogue';




@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  private apiUrl = 'http://localhost:8080/catalogue'; // Remplacez par l'URL de votre backend Spring

  constructor(private http: HttpClient) { }

  addCatalogue(catalogue: Catalogue): Observable<Catalogue> {
    return this.http.post<Catalogue>(`${this.apiUrl}/add`, catalogue);
  }
  getAllCatalogues(): Observable<Catalogue[]> {
    return this.http.get<Catalogue[]>(`${this.apiUrl}/all`);
  }
  deleteCatalogue(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  getCatalogueById(id: string): Observable<Catalogue> {
    return this.http.get<Catalogue>(`${this.apiUrl}/${id}`);
  }


}
