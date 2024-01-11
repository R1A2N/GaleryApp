import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private backendUrl = 'http://localhost:8000/api/upload';

  constructor(private http: HttpClient) { }

  uploadImage(image: File, imageType: string) {
    const formData = new FormData();
    formData.append('image', image);

    const options = {
      params: new HttpParams().set('imageType', imageType)
    };

    return this.http.post<any>(this.backendUrl, formData);
  }
  deleteImage(imageName: string, category: string): Observable<any> {

    return this.http.delete<any>(`votre_url_de_suppression/${imageName}`);
  }
}


