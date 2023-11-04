import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { isEqual } from 'lodash';
import { Observable, map, merge, of } from 'rxjs';
import { MovieDialogData } from '../../interfaces/movie';
import { MovieFormCreatorService } from '../../services/movie-form-creator.service';

@Component({
  selector: 'app-add-book-dialog',
  templateUrl: './add-book-dialog.component.html',
  styleUrls: ['./add-book-dialog.component.scss']
})
export class AddBookDialogComponent implements OnInit{
  isSame$: Observable<boolean>;
  form: FormGroup;
  isEdit: boolean;

  constructor(
    public dialogRef: MatDialogRef<AddBookDialogComponent>,
    private movieFormCreatorService: MovieFormCreatorService,
    @Inject(MAT_DIALOG_DATA) private dataForm: MovieDialogData,
  ) { }

  ngOnInit(): void {
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
      director: formResult.director,
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

