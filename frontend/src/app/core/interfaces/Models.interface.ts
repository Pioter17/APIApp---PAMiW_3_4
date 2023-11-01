export interface City {
 Version: number;
 Key: string;
 Type: string;
 Rank: number;
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
  IsDayTime: boolean;
  Temperature: Temperature;
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

export interface ForecastData {
  Temperature: {
    Minimum: {
      Value: number,
      Unit: string,
    },
    Maximum: {
      Value: number,
      Unit: string,
    }
  }[]
}
