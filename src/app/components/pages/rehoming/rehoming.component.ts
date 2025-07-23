import { Component } from '@angular/core';
import { Dog, DogService } from '../../../services/dog.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rehoming',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './rehoming.component.html',
  styleUrl: './rehoming.component.scss'
})
export class RehomingComponent {
  dogForm: FormGroup;
  previewUrl: string | null = null;
  newlyAddedDog: Dog | null = null;
  editingDogId: number | null = null;
  selectedFile: File | null = null; 

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public dogService: DogService 
  ) {
    this.dogForm = this.fb.group({
      name: ['', Validators.required],
      age: [0, Validators.required],
      sex: ['', Validators.required],
      breed: ['', Validators.required],
      description: ['']
    });
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', this.dogForm.value.name);
    formData.append('age', this.dogForm.value.age.toString());
    formData.append('sex', this.dogForm.value.sex);
    formData.append('breed', this.dogForm.value.breed);
    formData.append('description', this.dogForm.value.description);

    if (this.selectedFile) {
      formData.append('imageFile', this.selectedFile);
    }

    let url = 'http://localhost:5171/api/dogs/upload';
    let method = 'post';

    if (this.editingDogId !== null) {
      url = `http://localhost:5171/api/dogs/${this.editingDogId}`;
      method = 'put';
    }

    this.http.request<Dog>(method, url, { body: formData }).subscribe({
      next: (response) => {
        alert(this.editingDogId ? 'Hund uppdaterad!' : 'Hund tillagd!');
        this.newlyAddedDog = response;

        this.previewUrl = null;
        this.selectedFile = null;
        this.dogForm.reset();
        this.editingDogId = null;
      },
      error: err => {
        console.error('Fel:', err);
        alert('Något gick fel');
      }
    });

  }

  deleteDog(id: number) {
    this.http.delete(`http://localhost:5171/api/dogs/${id}`).subscribe({
      next: () => {
        alert('Hunden raderad!');
        if (this.newlyAddedDog?.id === id) {
          this.newlyAddedDog = null;
        }

        // 🧠 Uppdatera listan
        this.dogService.getDogsFromApi();
      },
      error: err => console.error('Kunde inte radera:', err)
    });
  }

  startEdit(dog: Dog) {
    this.editingDogId = dog.id;
    this.dogForm.patchValue({
      name: dog.name,
      age: dog.age,
      sex: dog.sex,
      breed: dog.breed,
      description: dog.description
    });

    this.previewUrl = dog.imageUrl;
    this.selectedFile = null; 
  }
}

