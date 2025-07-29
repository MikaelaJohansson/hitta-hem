import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DogService, Dog } from '../../../services/dog.service';
import { NgIf} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-adoption-details',
  standalone: true,
  templateUrl: './adoption-details.component.html',
  styleUrl: './adoption-details.component.scss',
  imports: [NgIf, FormsModule], 
})
export class AdoptionDetailsComponent {
  route = inject(ActivatedRoute);
  dogService = inject(DogService);
  http = inject(HttpClient);

  dog: Dog | undefined;
  interestCount = 0;
  hasVoted = false;

  firstName = '';
  lastName = '';
  email = "";
  confirmationMessage = '';


  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dogService.getDogFromApiById(id).subscribe(dog => {
      this.dog = dog;
      this.interestCount = dog.interestCount || 0;

      if (typeof sessionStorage !== 'undefined') {
      const voted = sessionStorage.getItem(`interest_${dog.id}`);
      this.hasVoted = voted === 'true';
      }

    });
  }

  submitInterest() {
    if (!this.dog || this.hasVoted) return;

    this.http.post<number>(`${environment.apiUrl}/api/dogs/interest/${this.dog!.id}`, {})
    .subscribe(count => {
      this.interestCount = count;
      this.hasVoted = true;
      this.firstName = '';
      this.lastName = '';
      this.email = "";
      this.confirmationMessage = "Intresseanmälan inskickad!";

      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem(`interest_${this.dog!.id}`, 'true');
      }

    });

  }
}



