import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Director } from '../interfaces/director';
import { PATHS } from '../constants/api-paths.const';

@Injectable({
  providedIn: 'root'
})
export class ApiDirectorService {
  private http = inject(HttpClient);

  getFilteredDirectors(name: string) : Observable<Director[]> {
    const params = (new HttpParams).append("name", name);

    return this.http.get<Director[]>(`${PATHS.API_MOVIES_BASE_PATH}${PATHS.SEARCH_DIRECTORS_ENDPOINT}`, {params});
  }

  getDirectors() : Observable<Director[]> {
    return this.http.get<Director[]>(`${PATHS.API_MOVIES_BASE_PATH}${PATHS.DIRECTORS_ENDPOINT}`);
  }

  postDirector(director: Director) : Observable<Director> {
    return this.http.post<Director>(`${PATHS.API_MOVIES_BASE_PATH}${PATHS.DIRECTORS_ENDPOINT}`, director)
  }

  putDirector(id: number, director: Director) : Observable<Director> {
    return this.http.put<Director>(`${PATHS.API_MOVIES_BASE_PATH}${PATHS.DIRECTORS_ENDPOINT}` + "/" + id, director)
  }

  deleteDirector(id: number){
    return this.http.delete<Director>(`${PATHS.API_MOVIES_BASE_PATH}${PATHS.DIRECTORS_ENDPOINT}` + "/" + id)
  }
}
