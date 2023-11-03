import { Component, Inject, inject } from '@angular/core';
import { ApiMovieService } from '../../services/api-movie-service.service';
import { Movie } from '../../interfaces/movie';

@Component({
  selector: 'app-display-movies',
  templateUrl: './display-movies.component.html',
  styleUrls: ['./display-movies.component.scss']
})
export class DisplayMoviesComponent {
  show = false;
  movies2 : Movie[] = [
    {
      id: 1,
      name: "star wars",
      director: "george lucas",
      producer: "lucasfilm",
      length: 140,
      rating:10.00
    },
    {
      id: 2,
      name: "star wars2",
      director: "george lucas",
      producer: "lucasfilm",
      length: 160,
      rating:9.40
    },
    {
      id: 3,
      name: "star wars3",
      director: "george lucas",
      producer: "lucasfilm",
      length: 120,
      rating:8.50
    },
    {
      id: 4,
      name: "star wars4",
      director: "george lucas",
      producer: "lucasfilm",
      length: 130,
      rating: 7.00
    },
  ];

  movies: Movie[] = [];

  constructor(

  ){}

  api = inject(ApiMovieService);





  showMovies(){
    this.show = true;
    // this.getMovies();
  }

  hideMovies(){
    this.show = false;
  }

  getMovies(){
    this.movies = [];
    this.showMovies();
    this.api.getMovies().subscribe((res)=>{
      res.forEach((elem)=>{
        this.movies.push(elem);
      })
      console.log(this.movies)
    })
  }

  addMovie(){

  }

  updateMovie(){

  }

  deleteMovie(id: number){
    this.api.deleteMovie(id).subscribe(
      (response) => {
        // Obsługa sukcesu, np. wyświetlenie informacji o usunięciu filmu
        console.log('Film został usunięty');
      },);
    let index: number;
    this.movies.forEach((elem)=>{
      if (elem.id == id){
        index = this.movies.indexOf(elem);
      }
    })
    this.movies.splice(index, 1);
  }
}
