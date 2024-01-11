
import { Injectable } from '@angular/core';
import axios from "axios";
@Injectable({
  providedIn: 'root'
})
export class AxiosService {
  private baseUrl = 'http://localhost:5000';

  constructor() {
    axios.defaults.baseURL ="http://localhost:5000"
    axios.defaults.headers.post["Content-Type"]="application/json"
  }
  getStrings() {
    return axios.get(`${this.baseUrl}/api/get_combined_data`);
  }
  postImageData(imagePath: string) {
    const data = { image_path: imagePath };
    return axios.post(`${this.baseUrl}/api/process_image_data`, data);
  }

}

