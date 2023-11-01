import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { City, Forecast, PForecast, SForecast, Weather } from '../../interfaces/Models.interface';
import { ApiWeatherService } from '../../services/api-weather-service.service';
import { BgcolorManagerService } from '../../services/bgcolor-manager.service';

@Component({
  selector: 'app-display-weather',
  templateUrl: './display-weather.component.html',
  styleUrls: ['./display-weather.component.scss']
})
export class DisplayWeatherComponent implements OnChanges, AfterViewInit{

  api = inject(ApiWeatherService);
  bgcolor = inject(BgcolorManagerService);
  @ViewChild('temperatureDiv') temperatureDiv: ElementRef = null;
  temp : number;

  @Input() city: City;
  @Input() city2: string;

  weather$: Observable<Weather[]>;
  yesterdayWeather$: Observable<PForecast[]>;
  oneHourWeather$: Observable<SForecast[]>;
  twelveHoursWeather$: Observable<SForecast[]>;
  tomorrowWeather$: Observable<Forecast>;
  fiveDaysWeather$: Observable<Forecast>;

  ngOnChanges(): void {
    this.getTemperatures();
    setTimeout(() => {
      const divContent = this.temperatureDiv.nativeElement.textContent;
      const regex = /Temperatura teraz:\s(\d+\.\d+)\s°C/;
      const match = regex.exec(divContent);

      if (match && match.length > 1) {
        this.temp = parseFloat(match[1]);
        this.changeBgColor();
      }
    }, 500);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const divContent = this.temperatureDiv.nativeElement.textContent;
      const regex = /Temperatura teraz:\s(\d+\.\d+)\s°C/;
      const match = regex.exec(divContent);

      if (match && match.length > 1) {
        this.temp = parseFloat(match[1]);
        this.changeBgColor();
      }
    }, 500);
  }

  getTemperatures(){
    this.weather$ = this.api.getCurrentConditions(this.city.Key);
    this.yesterdayWeather$ = this.api.getYesterdayForecast(this.city.Key);
    this.oneHourWeather$ = this.api.getOneHourForecast(this.city.Key);
    this.twelveHoursWeather$ = this.api.getTwelveHourForecast(this.city.Key);
    this.tomorrowWeather$ = this.api.getOneDailyForecast(this.city.Key);
    this.fiveDaysWeather$ = this.api.getFiveDaysForecast(this.city.Key);
  }

  changeBgColor(){
    console.log(this.temp)
    if(this.temp > 15){
      this.bgcolor.setBackgroundColor('#fdeece');
    }
    else {
      this.bgcolor.setBackgroundColor('#cee8fd');
    }
  }
}
