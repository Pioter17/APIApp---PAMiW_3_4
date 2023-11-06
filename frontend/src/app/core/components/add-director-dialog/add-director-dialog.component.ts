import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, merge, of } from 'rxjs';
import { MovieFormCreatorService } from '../../services/movie-form-creator.service';
import { MovieDialogData } from '../../interfaces/movie';
import { isEqual } from 'lodash';
import { DirectorFormCreatorService } from '../../services/director-form-creator.service';
import { DirectorDialogData } from '../../interfaces/director';

@Component({
  selector: 'app-add-director-dialog',
  templateUrl: './add-director-dialog.component.html',
  styleUrls: ['./add-director-dialog.component.scss']
})
export class AddDirectorDialogComponent implements OnInit{
  isSame$: Observable<boolean>;
  form: FormGroup;
  isEdit: boolean;

  constructor(
    public dialogRef: MatDialogRef<AddDirectorDialogComponent>,
    private directorFormCreatorService: DirectorFormCreatorService,
    @Inject(MAT_DIALOG_DATA) private dataForm: DirectorDialogData,
  ) { }

  ngOnInit(): void {
    this.form = this.directorFormCreatorService.getDirectorForm();
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
    let newDirector : DirectorDialogData = {
      name: formResult.name,
      nationality: formResult.nationality,
      age: formResult.age,
      isEdit: this.isEdit,
    };

    this.form.reset();
    this.dialogRef.close(newDirector);
  }

  onCancelClose() {
    this.dialogRef.close(null);
  }
}
