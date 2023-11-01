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
  movies : Movie[];

  constructor(

  ){}

  api = inject(ApiMovieService);





  showMovies(){
    this.show = true;
  }

  hideMovies(){
    this.show = false;
  }

  getMovies(){
    this.api.getMovies().subscribe((res)=>{
      res.forEach((elem)=>{
        this.movies.push(elem);
      })
    })
    console.log(this.movies)
  }
}
