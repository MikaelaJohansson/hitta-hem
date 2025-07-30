import { Component } from '@angular/core';
import { Dog, DogService } from '../../../services/dog.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  isEditing: boolean = false;
  uploading: boolean = false;

  fileError: string | null = null;
  selectedFileInfo: string | null = null;

  constructor(
    private fb: FormBuilder,
    private dogService: DogService
  ) {
    this.dogForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      sex: ['', Validators.required],
      breed: ['', Validators.required],
      description: ['']
    });
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    this.fileError = null;
    this.selectedFileInfo = null;

    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const allowedTypes = ['image/jpeg', 'image/png'];
      const maxSize = 2 * 1024 * 1024;

      if (!allowedTypes.includes(file.type)) {
        this.fileError = '❌ Endast JPG och PNG tillåts.';
        fileInput.value = '';
        return;
      }

      if (file.size > maxSize) {
        this.fileError = '❌ Filen är för stor. Maxstorlek är 2 MB.';
        fileInput.value = '';
        return;
      }

      this.selectedFile = file;

      const sizeInKB = (file.size / 1024).toFixed(1);
      this.selectedFileInfo = `✅ Vald fil: ${file.name} (${file.type}, ${sizeInKB} KB)`;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(event: Event) {
  event.preventDefault();
  this.fileError = null;

  if (!this.selectedFile && !this.editingDogId) {
    this.fileError = '❌ Vänligen välj en bild.';
    return;
  }

  const formData = new FormData();
  formData.append('name', this.dogForm.value.name?.trim() || '');
  formData.append('age', this.dogForm.value.age?.toString() ?? '0');
  formData.append('sex', this.dogForm.value.sex?.trim() || '');
  formData.append('breed', this.dogForm.value.breed?.trim() || '');
  formData.append('description', this.dogForm.value.description?.trim() || '');
 
  if (this.selectedFile) {
    formData.append('imageFile', this.selectedFile);
  }

  this.uploading = true; 

  setTimeout(() => {
    const request$ = this.editingDogId
      ? this.dogService.updateDog(this.editingDogId, formData)
      : this.dogService.uploadDog(formData);

    request$.subscribe({
      next: (response) => {
        this.newlyAddedDog = response;
        this.dogForm.reset();
        this.selectedFile = null;
        this.previewUrl = null;
        this.selectedFileInfo = null;
        this.editingDogId = null;
        this.isEditing = false;
        this.uploading = false; 
      },
      error: err => {
        console.error('Fel:', err);
        this.fileError = '❌ Något gick fel vid uppladdningen.';
        this.uploading = false; 
      }
    });
  }, 1000); 
}


  deleteDog(id: number) {
    this.dogService.deleteDogById(id).subscribe({
      next: () => {
        alert('Hunden raderad!');
        if (this.newlyAddedDog?.id === id) {
          this.newlyAddedDog = null;
        }
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
    this.selectedFileInfo = null;
    this.isEditing = true;
  }

  cancelEdit() {
    this.editingDogId = null;
    this.isEditing = false;
    this.dogForm.reset();
    this.previewUrl = null;
    this.selectedFileInfo = null;
  }
}
