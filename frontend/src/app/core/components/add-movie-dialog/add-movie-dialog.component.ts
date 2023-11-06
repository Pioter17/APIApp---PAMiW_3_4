import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { isEqual } from 'lodash';
import { Observable, map, merge, of } from 'rxjs';
import { MovieDialogData } from '../../interfaces/movie';
import { MovieFormCreatorService } from '../../services/movie-form-creator.service';
import { Director, DirectorDialogData } from '../../interfaces/director';
import { ApiDirectorService } from '../../services/api-director.service';

@Component({
  selector: 'app-add-movie-dialog',
  templateUrl: './add-movie-dialog.component.html',
  styleUrls: ['./add-movie-dialog.component.scss']
})
export class AddMovieDialogComponent implements OnInit{
  isSame$: Observable<boolean>;
  form: FormGroup;
  isEdit: boolean;
  directors: Director[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddMovieDialogComponent>,
    private movieFormCreatorService: MovieFormCreatorService,
    private apiDirectorService: ApiDirectorService,
    @Inject(MAT_DIALOG_DATA) private dataForm: MovieDialogData,
  ) { }

  ngOnInit(): void {
    this.apiDirectorService.getDirectors().subscribe((res) => {
      res.forEach((elem) => {
        this.directors.push(elem);
      })
    })
    this.form = this.movieFormCreatorService.getMovieForm();
    this.form.patchValue(this.dataForm);
    this.isEdit = this.dataForm?.isEdit;
    if (this.isEdit) {
      const { isEdit, ...response } = this.dataForm
      this.isSame$ = merge(
        of(true), this.form.valueChanges.pipe(
          map(() => isEqual(response, this.form.value)),
        ))
    } else {
      this.isSame$ = of(false);
    }
  }

  onAddClose() {
    const formResult = this.form.value;
    let newMovie : MovieDialogData = {
      name: formResult.name,
      director_id: formResult.director_id,
      producer: formResult.producer,
      rating: formResult.rating,
      length: formResult.length,
      isEdit: this.isEdit
    };

    this.form.reset();
    this.dialogRef.close(newMovie);
  }

  onCancelClose() {
    this.dialogRef.close(null);
  }
}

