import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Dog {
  id: number;
  name: string;
  age: number;
  sex: string;
  breed: string;
  description: string;
  imageUrl: string;
  interestCount?: number;
}

@Injectable({
  providedIn: 'root'
})
export class DogService {
  dogs = signal<Dog[]>([]);

  constructor(private http: HttpClient) {}

  getDogsFromApi() {
    this.http.get<Dog[]>(`${environment.apiUrl}/api/dogs`)
      .subscribe(dogs => {
        console.log('Hämtade från backend:', dogs);
        this.dogs.set(dogs);
      });
  }

  getDogFromApiById(id: number): Observable<Dog> {
    return this.http.get<Dog>(`${environment.apiUrl}/api/dogs/${id}`);
  }

  uploadDog(formData: FormData): Observable<Dog> {
    return this.http.post<Dog>(`${environment.apiUrl}/api/dogs/upload`, formData);
  }

  updateDog(id: number, formData: FormData): Observable<Dog> {
    return this.http.put<Dog>(`${environment.apiUrl}/api/dogs/${id}`, formData);
  }

  deleteDogById(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/dogs/${id}`);
  }
  
}

