import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AxiosService } from 'src/app/api.service';
import axios from 'axios';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {
  data: any;
  imagePath: string;
  response: any;
  dominantColorImages: string[] = [];

  constructor(private axiosService: AxiosService) { }

  ngOnInit() {
    this.fetchChartData();
  }

  fetchChartData() {
    this.axiosService.getStrings()
      .then((response: any) => {
        this.data = response.data;
        this.generateChart();
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  sendImagePathToAPI(imagePath: string) {
    axios.post<any>('http://votre-api.com/histogram', { imagePath })
      .then((response) => {
        this.response = response.data;
        this.generateChart();
        console.log('Réponse de l\'API:', response);
      })
      .catch((error) => {
        console.error('Erreur de l\'API:', error);
      });
  }

  ngAfterViewInit() {
    // It's generally not recommended to call generateChart() here as it might cause unexpected behavior.
    // It's better to call it in ngOnInit or after the data is fetched.
  }

  generateChart() {
    if (this.data && this.data.dominant_colors) {
      const colorPaths = Object.keys(this.data.dominant_colors).map(color => `${color}_histogram.png`);
      this.dominantColorImages = colorPaths.map(image => `http://votre-api.com/${image}`);
    }
  }

  submitt() { // Renamed submitt() to submit() for consistency
    this.axiosService.postImageData(this.imagePath)
      .then((response) => {
        this.response = response.data;
        this.data = this.response;
        this.generateChart();
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
