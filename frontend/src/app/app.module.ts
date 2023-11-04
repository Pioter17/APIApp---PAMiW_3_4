import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CitySearchComponent } from './core/components/city-search/city-search.component';
import { DisplayMoviesComponent } from './core/components/display-movies/display-movies.component';
import { DisplayWeatherComponent } from './core/components/display-weather/display-weather.component';
import { AccuweatherInterceptor } from './core/interceptors/accuweather.interceptor';
import { ApiWeatherService } from './core/services/api-weather-service.service';
import { AddBookDialogComponent } from './core/components/add-book-dialog/add-book-dialog.component';
import { ConfirmationDialogComponent } from './core/components/confirmation-dialog/confirmation-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    CitySearchComponent,
    DisplayWeatherComponent,
    DisplayMoviesComponent,
    AddBookDialogComponent,
    ConfirmationDialogComponent
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
    MatDialogModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccuweatherInterceptor,
      multi: true
    },
    ApiWeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
