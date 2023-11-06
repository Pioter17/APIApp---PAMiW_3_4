import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { Director } from '../../interfaces/director';
import { ApiDirectorService } from '../../services/api-director.service';
import { AddDirectorDialogComponent } from '../add-director-dialog/add-director-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-display-directors',
  templateUrl: './display-directors.component.html',
  styleUrls: ['./display-directors.component.scss']
})
export class DisplayDirectorsComponent {
  show = false;
  filtered = false;
  directors: Director[] = [];
  search: string;

  constructor(
    private dialog: MatDialog,
  ){}

  api = inject(ApiDirectorService);

  showDirectors(){
    this.show = true;
  }

  hideDirectors(){
    this.show = false;
  }

  getDirectors(){
    this.search = "";
    this.filtered = false;
    this.directors = [];
    this.showDirectors();
    this.api.getDirectors().subscribe((res) => {
      res.forEach((elem) => {
        this.directors.push(elem);
      })
    })
  }

  getFilteredDirectors(){
    this.filtered = true;
    this.directors = [];
    this.api.getFilteredDirectors(this.search).subscribe((res) => {
      res.forEach((elem) => {
        this.directors.push(elem);
      })
    })
  }

  addDirector(){
    const dialogRef = this.dialog.open(AddDirectorDialogComponent, {
      minWidth: '400px',
      minHeight: '300px',
    });

    dialogRef.afterClosed().pipe(
      filter((res) => !!res),
    ).subscribe((res) => {
      this.api.postDirector(res).subscribe(
        (response) => {
          let newDirector: Director = response;
          this.directors.push(newDirector);
        },);
    });
  }

  updateDirector(id: number, index: number){
    const dialogRef = this.dialog.open(AddDirectorDialogComponent, {
      minWidth: '400px',
      minHeight: '300px',
      data:{
        ...this.directors[index],
        isEdit: true,
      }
    });

    dialogRef.afterClosed().pipe(
      filter((res) => !!res),
    ).subscribe((res) => {
      this.api.putDirector(id, res).subscribe(
        (response) => {
          let newDirector: Director = response;
          this.directors[index] = newDirector;
          console.log('Film został zedytowany');
        }
      )
    });
  }

  deleteDirector(id: number, index: number){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      minWidth: '200px',
      minHeight: '100px',
    });

    dialogRef.afterClosed().pipe(
      filter((res) => !!res),
    ).subscribe(() => {
      this.api.deleteDirector(id).subscribe(
        (response) => {
          console.log('Film został usunięty');
        },);
      this.directors.splice(index, 1);
    });
  }
}
