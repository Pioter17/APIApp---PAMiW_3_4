import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { City, Forecast, PForecast, SForecast, Weather } from '../interfaces/Models.interface';
import { Observable } from 'rxjs';
import { PATHS } from '../constants/api-paths.const';

@Injectable({
  providedIn: 'root'
})
export class ApiManagementServiceService {

  private http = inject(HttpClient);

  getAutoCompleteLocations(q: string) : Observable<City[]> {
    const params = (new HttpParams).append("q", q);

    return this.http.get<City[]>(`${PATHS.API_BASE_PATH}${PATHS.AUTOCOMPLETE_ENDPOINT}`, {params});
  }

  getCurrentConditions(key: string) : Observable<Weather[]> {
  return this.http.get<Weather[]>(`${PATHS.API_BASE_PATH}${PATHS.CURRENT_WEATHER.replace(':locationKey', key)}`);
  }


  getOneHourForecast(key: string) : Observable<SForecast[]> {
    const params = (new HttpParams).append("metric", true);

    return this.http.get<SForecast[]>(`${PATHS.API_BASE_PATH}${PATHS.ONE_HOUR_FORECAST.replace(':locationKey', key)}`, {params});
  }

  getTwelveHourForecast(key: string) : Observable<SForecast[]> {
    const params = (new HttpParams).append("metric", true);

    return this.http.get<SForecast[]>(`${PATHS.API_BASE_PATH}${PATHS.TWELVE_HOURS_FORECAST.replace(':locationKey', key)}`, {params});
  }

  getOneDailyForecast(key: string) : Observable<Forecast> {
    const params = (new HttpParams).append("metric", true);

    return this.http.get<Forecast>(`${PATHS.API_BASE_PATH}${PATHS.ONE_DAY_FORECAST.replace(':locationKey', key)}`, {params});
  }

  getFiveDaysForecast(key: string) : Observable<Forecast> {
    const params = (new HttpParams).append("metric", true);

    return this.http.get<Forecast>(`${PATHS.API_BASE_PATH}${PATHS.FIVE_DAYS_FORECAST.replace(':locationKey', key)}`, {params});
  }

  getYesterdayForecast(key: string) : Observable<PForecast[]> {
    return this.http.get<PForecast[]>(`${PATHS.API_BASE_PATH}${PATHS.YESTERDAYS_WEATHER.replace(':locationKey', key)}`);
  }
}
