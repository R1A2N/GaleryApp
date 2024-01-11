import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {CatalogueDetailsComponent} from "./component/catalogue-details/catalogue-details.component";
import {CatalogueComponent} from "./component/catalogue/catalogue.component";
import {LoginComponent} from "./login/login.component";
import {ImageDetailsComponent} from "./component/image-details/image-details.component";

const routes: Routes = [

  { path: 'login', component: LoginComponent },

  { path: '', component: CatalogueComponent, pathMatch: 'full' },
  { path: 'catalogue/:id', component: CatalogueDetailsComponent },
  { path: 'image/:nomImage', component: ImageDetailsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
