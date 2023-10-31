import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { City } from '../../interfaces/Models.interface';
import { ApiManagementServiceService } from '../../services/api-weather-service.service';
import { BehaviorSubject, Observable, debounceTime, distinctUntilChanged, filter, of, switchMap, take, tap } from 'rxjs';
import { ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss']
})
export class CitySearchComponent implements OnInit{

  api = inject(ApiManagementServiceService);

  private optionsSubject = new BehaviorSubject<City[]>([]);
  options$: Observable<City[]> = this.optionsSubject.asObservable();
  control = new FormControl<string>('');
  cities: City[];
  selectedCity: string = '';

  // selectedOption: string = '';

  // cityIsPicked: boolean = false;

  ngOnInit(): void {
    // this.options$ = this.control.valueChanges.pipe(
    //   debounceTime(500),
    //   distinctUntilChanged(),
    //   switchMap((res) => this.api.getAutoCompleteLocations(res)),
      // tap((res) => this.cities = res)
    // )
  }

  onSubmit(): void {
    if(this.control.value) {
      this.api.getAutoCompleteLocations(this.control.value).subscribe((res) => {
        this.cities = res;
        // Emituj nową wartość do options$
        this.optionsSubject.next(this.cities);
      });
    }
  }

  onSelect(val: MatAutocompleteSelectedEvent): void {
    const value = val?.option?.value as string;

  }
}
  // getCitiesNames(){
  //   this.options$ = [];
  //   this.api.getAutoCompleteLocations(this.selectedCity).subscribe((data)=>{
  //     this.cities = data;
  //     this.cities.forEach((elem)=>{
  //       this.options$.push(elem.LocalizedName);
  //     })
  //   });
  // }
// }
