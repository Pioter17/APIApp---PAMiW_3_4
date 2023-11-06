import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DirectorFormCreatorService {
  constructor(
    private fb: FormBuilder,
  ) { }

  getDirectorForm(): FormGroup {
    return this.fb.group({
      name: [null, Validators.required],
      nationality: [null, Validators.required],
      age: [null, [Validators.required, Validators.min(20), Validators.max(90)]],
    })
  }
}
