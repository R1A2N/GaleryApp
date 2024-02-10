// image-details.component.ts

import { Component, OnInit } from '@angular/core';
import { FlaskService } from "../../service/flask.service";
import { ActivatedRoute } from "@angular/router";
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';

HighchartsMore(Highcharts);
HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);

interface DominantColor {
  value: string;
}

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.scss']
})
export class ImageDetailsComponent implements OnInit {
  nomImage: string;
  imageDetails: any;
  histogramImages: string[] = [];
  dominantColors: DominantColor[] = [];
  dataAvailable: boolean = false;
  messageToShow: string = '';
  showDataMessage: boolean = false;

  constructor(private route: ActivatedRoute, private flaskService: FlaskService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.nomImage = params['nomImage'];

      this.flaskService.getImageDetails(this.nomImage).subscribe(
        (data) => {
          this.imageDetails = data;
          console.log('Détails de l\'image:', this.imageDetails);

          if (data && data.histogram_colors) {
            this.histogramImages = Object.values(data.histogram_colors).map((details: any) => details.histogramme_image);
          }

          if (data && data.dominant_colors) {
            this.dominantColors = Object.values(data.dominant_colors).map((color: any) => ({value: color}));
          }

          this.dataAvailable = true;
        },
        (error) => {
          console.error('Erreur lors de la récupération des détails de l\'image:', error);
          this.messageToShow = 'Erreur lors de la récupération des détails de l\'image.';
          this.dataAvailable = false;
        }
      );
    });
  }

  getDominantColors(): DominantColor[] {
    return this.dominantColors;
  }

  closeAlert() {
    this.messageToShow = '';
  }

  rgbColor(colorValue: string): any {
    return {'background-color': `rgb(${colorValue})`};
  }
  onCalculerClick() {
    this.flaskService.processImageData(this.nomImage)
      .subscribe(
        (response) => {
          console.log(response);

          if (response && response.message) {
            this.messageToShow = response.message;
          }

          this.showDataMessage = true;

          // Ajoutez le bloc suivant pour mettre à jour les couleurs dominantes
          if (response && response.data && response.data.dominant_colors) {
            this.dominantColors = Object.values(response.data.dominant_colors).map((color: any) => ({ value: color }));
          }
        },
        (error) => {
          console.error('Erreur lors de la requête HTTP :', error);
          this.messageToShow = 'Erreur lors du calcul de l\'image.';
        }
      );
  }


}
