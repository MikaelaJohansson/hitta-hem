import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';

export interface Dog {
  id: number;
  name: string;
  age: number;
  sex: string;
  breed: string;
  description:string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class DogService {
  dogs = signal<Dog[]>([]);

  constructor(private http: HttpClient) { }

  getDogsFromApi(){
    this.http.get<Dog[]>('http://localhost:5171/api/dogs')
    .subscribe(dogs => {
      console.log('Hämtade från backend:', dogs);
      this.dogs.set(dogs);
    });

  }

  getDogFromApiById(id:number){
    return this.http.get<Dog>(`http://localhost:5171/api/dogs/${id}`);
  }


}
