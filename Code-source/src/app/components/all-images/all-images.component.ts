import { Component,OnInit } from '@angular/core';
import {ImageService} from 'src/app/image.service';


@Component({
  selector: 'app-all-images',
  templateUrl: './all-images.component.html',
  styleUrls: ['./all-images.component.scss']
})
export class AllImagesComponent implements OnInit {

  constructor(private imagesService: ImageService) {}

  ngOnInit(): void {

  }
}
