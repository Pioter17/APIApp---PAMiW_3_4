import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { Movie } from '../../interfaces/movie';
import { ApiMovieService } from '../../services/api-movie-service.service';
import { AddBookDialogComponent } from '../add-book-dialog/add-book-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-display-movies',
  templateUrl: './display-movies.component.html',
  styleUrls: ['./display-movies.component.scss']
})
export class DisplayMoviesComponent {
  show = false;
  filtered = false;
  movies: Movie[] = [];
  search: string;

  constructor(
    private dialog: MatDialog,
  ){}

  api = inject(ApiMovieService);

  showMovies(){
    this.show = true;
  }

  hideMovies(){
    this.show = false;
  }

  getMovies(){
    this.filtered = false;
    this.movies = [];
    this.showMovies();
    this.api.getMovies().subscribe((res) => {
      res.forEach((elem) => {
        this.movies.push(elem);
      })
    })
  }

  getFilteredMovies(){
    this.filtered = true;
    this.movies = [];
    this.api.getFilteredMovies(this.search).subscribe((res) => {
      res.forEach((elem) => {
        this.movies.push(elem);
      })
    })
  }

  addMovie(){
    const dialogRef = this.dialog.open(AddBookDialogComponent, {
      minWidth: '400px',
      minHeight: '300px',
    });

    dialogRef.afterClosed().pipe(
      filter((res) => !!res),
    ).subscribe((res) => {
      this.api.postMovie(res).subscribe(
        (response) => {
          let newMovie: Movie = response;
          this.movies.push(newMovie);
          console.log('Film został dodany');
        },);
    });
  }

  updateMovie(id: number, index: number){
    const dialogRef = this.dialog.open(AddBookDialogComponent, {
      minWidth: '400px',
      minHeight: '300px',
      data:{
        ...this.movies[index],
        isEdit: true,
      }
    });

    dialogRef.afterClosed().pipe(
      filter((res) => !!res),
    ).subscribe((res) => {
      this.api.putMovie(id, res).subscribe(
        (response) => {
          let newMovie: Movie = response;
          this.movies[index] = newMovie;
          console.log('Film został zedytowany');
        }
      )
    });
  }

  deleteMovie(id: number, index: number){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      minWidth: '200px',
      minHeight: '100px',
    });

    dialogRef.afterClosed().pipe(
      filter((res) => !!res),
    ).subscribe(() => {
      this.api.deleteMovie(id).subscribe(
        (response) => {
          console.log('Film został usunięty');
        },);
      this.movies.splice(index, 1);
    });
  }
}
