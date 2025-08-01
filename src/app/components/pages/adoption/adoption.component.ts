import { Component } from '@angular/core';
import { DogService } from '../../../services/dog.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-adoption',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './adoption.component.html',
  styleUrl: './adoption.component.scss'
})
export class AdoptionComponent {
  environment = environment;

  constructor(public dogService: DogService) {
    this.dogService.getDogsFromApi();
  }
}


