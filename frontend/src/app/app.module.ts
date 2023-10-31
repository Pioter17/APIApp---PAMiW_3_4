import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiManagementServiceService } from './core/services/api-management-service.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AccuweatherInterceptor } from './core/interceptors/accuweather.interceptor';
import { CitySearchComponent } from './core/components/city-search/city-search.component';
import { DisplayWeatherComponent } from './core/components/display-weather/display-weather.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
@NgModule({
  declarations: [
    AppComponent,
    CitySearchComponent,
    DisplayWeatherComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccuweatherInterceptor,
      multi: true
    },
    ApiManagementServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
