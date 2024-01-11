import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogueService } from '../../service/catalogue.service';
import { ImageUploadService } from '../../service/image-upload.service';
import { FlaskService } from '../../service/flask.service';

@Component({
  selector: 'app-catalogue-details',
  templateUrl: './catalogue-details.component.html',
  styleUrls: ['./catalogue-details.component.scss']
})
export class CatalogueDetailsComponent implements OnInit {
  catalogueId: string | null = null;
  catalogueName: string | null = null;
  selectedFiles: FileList | null = null;
  images: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private catalogueService: CatalogueService,
    private imageUploadService: ImageUploadService,
    private flaskService: FlaskService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.catalogueId = params.get('id');
      if (this.catalogueId) {
        this.catalogueService.getCatalogueById(this.catalogueId).subscribe(
          catalogue => {
            this.catalogueName = catalogue.catalogueName;
          },
          error => {
            console.error('Error fetching catalogue details:', error);
          }
        );
        this.loadImages();
      }
    });
  }

  onFilesSelected(event: any) {
    this.selectedFiles = event.target.files || null;
  }

  uploadImages() {
    if (this.selectedFiles) {
      const selectedType: string | null = this.catalogueId;

      if (selectedType !== null) {
        const filesArray = Array.from(this.selectedFiles);

        filesArray.forEach((file: File) => {
          this.imageUploadService.uploadImage(file, selectedType).subscribe({
            next: (imageUrl) => {
              console.log('Image uploaded successfully. Image URL:', imageUrl);
            },
            error: (error) => {
              console.error('Error uploading image:', error);
            }
          });
        });

        // Rafraîchissez la liste des images après avoir téléchargé toutes les images
        this.loadImages();
      } else {
        console.warn('No file selected for upload.');
      }
    }
  }

  deleteImage(imageId: number) {
    this.imageUploadService.deleteImage(imageId).subscribe({
      next: () => {
        this.loadImages(); // Met à jour la liste des images après la suppression
        console.log('Image deleted successfully.');
      },
      error: (error) => {
        console.error('Error deleting image:', error);
      }
    });
  }



  private loadImages() {
    this.imageUploadService.getImagesByCatalogueId(this.catalogueId).subscribe({
      next: (images) => {
        this.images = images;
      },
      error: (error) => {
        console.error('Error fetching images:', error);
      }
    });
  }

}
