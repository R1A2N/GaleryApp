// catalogue.component.ts
import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../../service/catalogue.service';
import { Catalogue } from '../../modeles/catalogue';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {
  newCatalogue: Catalogue = {
    catalogueName: "", catalogueUrl: "", nmbr_img: 0
  };

  catalogues: Catalogue[] = [];

  constructor(private catalogueService: CatalogueService ,  private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllCatalogues();
    this.route.params.subscribe(params => {
      const catalogueId = params['id'];
      // Utilisez l'ID pour charger les détails du catalogue
    });
  }

  addCatalogue(): void {
    this.catalogueService.addCatalogue(this.newCatalogue)
      .subscribe(
        response => this.handleSuccess(response),
        error => this.handleError(error)
      );
  }

  getAllCatalogues(): void {
    this.catalogueService.getAllCatalogues()
      .subscribe(
        catalogues => this.catalogues = catalogues,
        error => this.handleError(error)
      );
  }



  private handleSuccess(response: Catalogue): void {
    console.log('Catalogue added successfully:', response);
    // Ajoutez le code pour traiter la réponse du serveur ici
    this.getAllCatalogues(); // Rafraîchir la liste des catalogues
  }

  private handleError(error: any): void {
    console.error('Error:', error);
    // Ajoutez le code pour gérer les erreurs ici
  }
  deleteCatalogue(id: number | undefined): void {
    if (id !== undefined) {
      this.catalogueService.deleteCatalogue(id)
        .subscribe(
          response => this.handleDeleteSuccess(response),
          error => this.handleDeleteError(error)
        );
    } else {
      console.error('ID is undefined. Cannot delete catalogue.');
    }
  }
  private handleDeleteSuccess(response: any): void {
    console.log('Catalogue deleted successfully:', response);
    this.getAllCatalogues(); // Rafraîchir la liste des catalogues après la suppression
  }

  private handleDeleteError(error: any): void {
    console.error('Error deleting catalogue:', error);
  }
  navigateToCatalogueDetails(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/catalogue', id]);
    } else {
      console.error('ID is undefined. Cannot navigate to catalogue details.');
    }
  }

}
