import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PATHS } from '../constants/api-paths.const';
import { Movie, MovieDTO, MovieResponse } from '../interfaces/movie';


@Injectable({
  providedIn: 'root'
})
export class ApiMovieService {

  private http = inject(HttpClient);

  getFilteredMovies(name: string) : Observable<Movie[]> {
    const params = (new HttpParams).append("name", name);

    return this.http.get<Movie[]>(`${PATHS.API_MOVIES_BASE_PATH}${PATHS.SEARCH_MOVIES_ENDPOINT}`, {params});
  }

  getMovies() : Observable<Movie[]> {
    return this.http.get<Movie[]>(`${PATHS.API_MOVIES_BASE_PATH}${PATHS.MOVIES_ENDPOINT}`);
  }

  postMovie(movie: MovieDTO) : Observable<MovieResponse> {
    return this.http.post<MovieResponse>(`${PATHS.API_MOVIES_BASE_PATH}${PATHS.MOVIES_ENDPOINT}`, movie)
  }

  putMovie(id: number, movie: MovieDTO) : Observable<MovieResponse> {
    return this.http.put<MovieResponse>(`${PATHS.API_MOVIES_BASE_PATH}${PATHS.MOVIES_ENDPOINT}` + "/" + id, movie)
  }

  deleteMovie(id: number){
    return this.http.delete<Movie>(`${PATHS.API_MOVIES_BASE_PATH}${PATHS.MOVIES_ENDPOINT}` + "/" + id)
  }
}

