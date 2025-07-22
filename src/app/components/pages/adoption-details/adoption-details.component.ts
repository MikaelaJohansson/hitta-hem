import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DogService, Dog } from '../../../services/dog.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-adoption-details',
  standalone: true,
  templateUrl: './adoption-details.component.html',
  imports: [NgIf],
})
export class AdoptionDetailsComponent {
  route = inject(ActivatedRoute);
  dogService = inject(DogService);

  dog: Dog | undefined;

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dogService.getDogFromApiById(id).subscribe(dog => {
      this.dog = dog;
    });
  }
}

