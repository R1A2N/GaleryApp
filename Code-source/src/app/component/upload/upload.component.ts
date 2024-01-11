import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ImageService } from 'src/app/image.service';
import { ImageData } from 'src/app/modeles/Image';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  form: FormGroup;
  customImageTypes: string[] = [];
  selectedType: string = 'All';
  images: { [key: string]: ImageData[] } = {
    'All': [],
    'Nature': [],
    'Fruits': [],
    'Fourniture': []
  };
  formRef: FormGroup | null = null;

  imagePreviews: string[] = [];
  allImageTypes: string[] = ['All', 'Nature', 'Fruits', 'Fourniture'];



  constructor(
    private http: HttpClient,
    private imageUploadService: ImageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      imageType: new FormControl('Nature'),
      image: new FormControl(null),
      customImageType: new FormControl(''),



    });

    this.form.get('customImageType')?.valueChanges.subscribe((value) => {
      if (value && !this.allImageTypes.includes(value)) {
        this.allImageTypes = [...this.allImageTypes, value];
      }
    });
    this.formRef = this.form;
  }


  onTypeChange(type: string) {
    // Mettez à jour le type sélectionné
    this.form.get('imageType')?.setValue(type);

    // Ajouter dynamiquement le type à la liste
    if (!this.allImageTypes.includes(type)) {
      this.allImageTypes = [...this.allImageTypes, type];
    }

    // Mettez à jour la liste des images à afficher en fonction du type sélectionné
    this.displayImagesByType(type);
  }
  onAddCustomType() {
    const customImageTypeControl = this.form.get('customImageType');
    const customImageType = customImageTypeControl?.value as string;

    if (customImageType && !this.customImageTypes.includes(customImageType)) {
      this.customImageTypes = [...this.customImageTypes, customImageType];

      // Ajoutez cette ligne pour mettre à jour l'affichage des images
      this.displayImagesByType(customImageType);

      customImageTypeControl?.reset();
    }
  }

  displayImagesByType(type: string) {

  }

  imagesToDisplay(): ImageData[] {
    // Filtrer les images en fonction du type sélectionné
    if (this.selectedType === 'All') {
      return this.images['All'].concat(this.images['Nature'], this.images['Fruits'], this.images['Fourniture']);
    } else {
      return this.images[this.selectedType];
    }
  }

  addCustomImageTypeOption(value: string) {
    if (value && !this.customImageTypes.includes(value)) {
      this.customImageTypes.push(value);
    }
  }
  onFileSelect(event: any): void {
    const input = event.target as HTMLInputElement;

    if (input && input.files) {
      const files = Array.from(input.files);

      // Clear previous previews
      this.imagePreviews = [];

      for (const file of files) {
        const reader = new FileReader();

        reader.onload = () => {
          this.imagePreviews.push(reader.result as string);
        };

        reader.readAsDataURL(file);
      }

      // Upload images (you can implement this method based on your needs)
      this.uploadImages(files);

      // Display images immediately after selecting
      this.displayImages(files);
    } else {
      console.error("Input or input.files is not defined.");
    }
  }



  displayImages(files: File[]): void {
    const selectedType = this.form.get('imageType')?.value || 'default';

    if (!(selectedType in this.images)) {
      this.images[selectedType] = [];
    }

    for (const file of files) {
      const reader = new FileReader();

      reader.onload = () => {
        const imageUrl = reader.result as string;
        const imageData: ImageData = {
          name: file.name,
          url: imageUrl,
        };

        console.log('Displaying Image:', imageData);
        this.images[selectedType].push(imageData);
      };

      reader.readAsDataURL(file);
    }
  }


  showHistogram(imagePath: string) {
    const formattedImagePath = `Projet/images/${imagePath}`;
    // Redirigez vers la page Histogram en passant le chemin de l'image en tant que paramètre
    this.router.navigate(['/histogram'], { queryParams: { imagePath: formattedImagePath } });
  }

  uploadImages(files: File[]) {
    const selectedType = this.form.get('imageType')?.value || 'default';

    for (const file of files) {
      this.imageUploadService.uploadImage(file, selectedType).subscribe(
        (response) => {
          console.log('Image uploaded:', response);
          // Additional logic
        },
        (error) => {
          console.error('Error uploading image:', error);
        }
      );
    }
  }



  downloadAndUploadImages(images: FileList) {
    for (let i = 0; i < images.length; i++) {
      const image = images[i];

      this.imageUploadService.uploadImage(image, this.form.get('imageType')?.value || 'default').subscribe(
        (response) => {
          console.log('Image uploaded:', response);
          // Votre logique ici
        },
        (error) => {
          console.error('Error uploading image:', error);
        }
      );
    }
  }



  onSubmit() {
    const imageControl = this.form.get('image');

    if (imageControl instanceof FormControl) {
      const images = (imageControl as FormControl).value as FileList;

      this.downloadAndUploadImages(images);
      this.form.reset();
    }
  }

  downloadImage(imageData: ImageData) {
    const a = document.createElement('a');
    a.href = imageData.url;
    a.download = `downloaded_image_${Date.now()}.png`;
    a.click();
  }

  // Dans votre composant
  removeImage(imageData: ImageData): void {
    console.log('Removing image:', imageData);

    const selectedType = this.form.get('imageType')?.value;
    const customType = this.form.get('customImageType')?.value;
    const typeToRemove = selectedType === 'Custom' && customType ? customType : selectedType || 'All';

    console.log('Type to remove:', typeToRemove);

    // Supprimer de la catégorie spécifiée
    this.imageUploadService.deleteImage(imageData.name, typeToRemove).subscribe(
      () => {
        console.log(`Image deleted from ${typeToRemove} category:`, imageData);
        this.removeImageFromList(imageData, typeToRemove);
      },
      (error) => {
        console.error(`Error deleting image from ${typeToRemove} category:`, error);
      }
    );

    // Supprimer également de la catégorie "All"
    this.imageUploadService.deleteImage(imageData.name, 'All').subscribe(
      () => {
        console.log('Image deleted from All category:', imageData);
        this.removeImageFromList(imageData, 'All');
      },
      (error) => {
        console.error('Error deleting image from All category:', error);
      }
    );
  }




  private removeImageFromList(imageData: ImageData, category: string): void {
    const index = this.images[category].findIndex(img => img.name === imageData.name);
    if (index !== -1) {
      this.images[category].splice(index, 1);
    }
  }






  getImagesByType(type: string) {
    this.http.get<any>(`http://localhost:3000/images`)
      .subscribe((data: any) => {
        console.log('All Images:', data.images);

        this.imagesToDisplay = data.images.filter((imageName: string) => imageName.startsWith(type));
        console.log(`${type} Images:`, this.imagesToDisplay);
      });
  }
/*
  imagesToDisplay(): ImageData[] {
    // Filtrer les images en fonction du type sélectionné
    if (this.selectedType === 'All') {
      return this.images['All'].concat(this.images['Nature'], this.images['Fruits'], this.images['Fourniture']);
    } else {
      return this.images[this.selectedType];
    }
  }*/



getSelectedImages(): ImageData[] {
  return this.imagesToDisplay().filter(image => image.selected);
}

// Example function to perform an action on selected images
performActionOnSelectedImages(action: string) {
  const selectedImages = this.getSelectedImages();
  // Perform the action on selectedImages based on the value of 'action'
  console.log(`Performing ${action} on selected images:`, selectedImages);
}
areImagesSelected(): boolean {
  const selectedImages = this.getSelectedImages();
  return selectedImages.length > 0;
}

downloadSelectedImages() {
  const selectedImages = this.getSelectedImages();
  // Logique de téléchargement ici
}

removeSelectedImages() {
  const selectedImages = this.getSelectedImages();
  // Logique de suppression ici
}





}



