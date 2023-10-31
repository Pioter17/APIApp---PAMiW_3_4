export interface AdministrativeArea {
  ID: string;
  LocalizedName: string;
}

export interface Alert {
  ID: string;
  LocalizedDescription: string;
}

export interface City {
 Version: number;
 Key: string;
 Type: string;
 Rank: number;
 LocalizedName: string;
 Country: Country;
 AdministrativeArea: AdministrativeArea;
}

export interface Country {
  ID: string;
  LocalizedName: string;
}


export interface Imperial {
  Value: number;
  Unit: string;
  UnitType: number;
}

export interface Metric {
  Value: number;
  Unit: string;
  UnitType: number;
}

export interface Temperature {
  Metric: Metric;
  Imperial: Imperial;
}

export interface Weather {
  LocalObservationDateTime: Date;
  EpochTime: number;
  WeatherText: string;
  WeatherIcon: number;
  HasPrescipitation: boolean;
  PrescipitationType: object;
  IsDayTime: boolean;
  Temperature: Temperature;
  MobileLink: string;
  Link: string;
}

export interface Forecast {
  DailyForecasts: {
    Temperature: {
      Minimum: {
        Value: number,
        Unit: string,
      },
      Maximum: {
        Value: number,
        Unit: string,
      }
    }
  }[]
}

export interface SForecast {
  Temperature: {
    Value: number;
    Unit: string;
    UnitType: number;
  }
}

export interface PForecast {
  Temperature: Temperature;
}
