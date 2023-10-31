import { Component, OnInit } from '@angular/core';
import { ApiManagementServiceService } from './core/services/api-weather-service.service';
import { City, Forecast, PForecast, SForecast, Weather } from './core/interfaces/Models.interface';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'WeatherForecast';

  constructor(
    private api: ApiManagementServiceService
  ){ }

  ngOnInit(): void {
  }
}
