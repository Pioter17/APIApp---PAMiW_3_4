import { Component, OnInit, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { City } from '../../interfaces/Models.interface';
import { ApiWeatherService } from '../../services/api-weather-service.service';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss']
})
export class CitySearchComponent implements OnInit{

  api = inject(ApiWeatherService);

  list = ["Warszawa", "Lublin", "Gdansk", "wrocalw", "olsztyn", "slupsk", "Krakow"];

  private optionsSubject = new BehaviorSubject<City[]>([]);
  options$: Observable<City[]> = this.optionsSubject.asObservable();
  control = new FormControl<string>('');
  cities: City[];
  selectedCity2: string = '';
  selectedCity: City;

  // selectedOption: string = '';

  // cityIsPicked: boolean = false;

  ngOnInit(): void {

  }

  onEnter(event: Event): void {
    if (event instanceof KeyboardEvent) {
      if (event.key === 'Enter' && this.control.value) {
        this.api.getAutoCompleteLocations(this.control.value).subscribe((res) => {
          this.cities = res;
          // Emituj nową wartość do options$
          this.optionsSubject.next(this.cities);
        });
      }
    }
  }

  chooseCity(city: City): void {
    this.selectedCity = city;
    // this.selectedCity = city.LocalizedName;
  }
}
