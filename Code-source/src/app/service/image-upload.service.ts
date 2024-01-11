import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  private apiUrl = 'http://localhost:8080/app/image';

  constructor(private http: HttpClient) {}

  uploadImage(image: File, catalogueId: string | null): Observable<string> {
    const formData: FormData = new FormData();
    const timestamp = new Date().getTime();
    const uniqueFileName = `${timestamp}_${image.name}`;
    formData.append('file', image, uniqueFileName);

    return this.http.post<any>(`${this.apiUrl}/upload/${catalogueId}`, formData)
      .pipe(
        map(response => response.imageUrl), // Modifié ici pour renvoyer l'URL de l'image
        catchError((error: HttpErrorResponse) => {
          console.error('Error uploading image:', error);
          return throwError('Something bad happened; please try again later.');
        })
      );
  }

  getImagesByCatalogueId(catalogueId: string | null): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/images/${catalogueId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching images:', error);
        return throwError('Something bad happened; please try again later.');
      })
    );
  }
  deleteImage(imageId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${imageId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error deleting image:', error);
        return throwError('Something bad happened; please try again later.');
      })
    );
  }



}
