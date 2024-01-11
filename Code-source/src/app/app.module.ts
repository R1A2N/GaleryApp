import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';

import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { UploadComponent } from './component/upload/upload.component';
import { AllImagesComponent } from './components/all-images/all-images.component';
import { UploadContentComponent } from './upload-content/upload-content.component';
import { AxiosService } from './api.service';
import { ImageService} from './image.service';
import { ChartComponent } from './component/chart/chart.component';
import { RouterModule } from '@angular/router';
import { CatalogueComponent } from './component/catalogue/catalogue.component';
import { CatalogueDetailsComponent } from './component/catalogue-details/catalogue-details.component';
import {LoginComponent} from "./login/login.component";
import { AuthComponent } from './component/auth/auth.component';
import {AuthService} from "./service/auth.service";
import { ImageDetailsComponent } from './component/image-details/image-details.component';



//import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    UploadComponent,
    AllImagesComponent,
    UploadContentComponent,
    ChartComponent,
    CatalogueComponent,
    CatalogueDetailsComponent,
    AuthComponent,
    ImageDetailsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
   // ChartsModule,

   RouterModule,
   RouterModule.forRoot([

  ]),

  ],
  providers: [
  AxiosService,
	ImageService,
    HttpClient,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

