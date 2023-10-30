import { Component, inject } from '@angular/core';
import { City, Weather, Forecast, SForecast, PForecast } from '../../interfaces/Models.interface';
import { ApiManagementServiceService } from '../../services/api-management-service.service';

@Component({
  selector: 'app-display-weather',
  templateUrl: './display-weather.component.html',
  styleUrls: ['./display-weather.component.scss']
})
export class DisplayWeatherComponent {

  api = inject(ApiManagementServiceService);

  city: string = '';
  options : string[] = [];
  selectedOption: string = '';
  cities: City[] = [];
  temp: number[] = [0, 0, 0, 0, 0, 0];
  weather!: Weather;
  forecast!: Forecast;
  sforecast!: SForecast;
  pforecast!: PForecast;
  cityIsPicked = false;

  getCurrentLocation(){
    let index = this.options.indexOf(this.selectedOption);
    this.api.getCurrentConditions(this.cities[index].Key).subscribe((data)=>{
      if (data && data.length > 0) {
        this.weather = data[0];
      }
      this.cityIsPicked=true;
      this.temp[0] = this.weather.Temperature.Metric.Value;
      this.getOneHourForecast(index);
      this.getTwelveHourForecast(index);
      this.getOneDailyForecast(index);
      this.getFiveDaysForecast(index);
      this.getYesterdayForecast(index);
    });
  }

  getOneHourForecast(index: number){
    this.api.getOneHourForecast(this.cities[index].Key).subscribe((data)=>{
      this.sforecast = data[0];
      this.temp[1] = this.sforecast.Temperature.Value;
    });
  }

  getTwelveHourForecast(index: number){
    this.api.getTwelveHourForecast(this.cities[index].Key).subscribe((data)=>{
      this.sforecast = data[11];
      this.temp[2] = this.sforecast.Temperature.Value;
    });
  }

  getOneDailyForecast(index: number){
    this.api.getOneDailyForecast(this.cities[index].Key).subscribe((data)=>{
      this.forecast = data;
      this.temp[3] = this.forecast.DailyForecasts[0].Temperature.Minimum.Value;
    });
  }

  getFiveDaysForecast(index: number){
    this.api.getFiveDaysForecast(this.cities[index].Key).subscribe((data)=>{
      this.forecast = data;
      this.temp[4] = this.forecast.DailyForecasts[4].Temperature.Minimum.Value;
    });
  }

  getYesterdayForecast(index: number){
    this.api.getYesterdayForecast(this.cities[index].Key).subscribe((data)=>{
      this.pforecast = data[23];
      this.temp[5] = this.pforecast.Temperature.Metric.Value;
    });
  }
}
