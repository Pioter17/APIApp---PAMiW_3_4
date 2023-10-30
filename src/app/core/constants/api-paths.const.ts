export const PATHS = {
  AUTOCOMPLETE_ENDPOINT: '/locations/v1/cities/autocomplete',
  CURRENT_WEATHER: '/currentconditions/v1/:locationKey',
  ONE_HOUR_FORECAST: '/forecasts/v1/hourly/1hour/:locationKey',
  TWELVE_HOURS_FORECAST: '/forecasts/v1/hourly/12hour/:locationKey',
  ONE_DAY_FORECAST:  '/forecasts/v1/daily/1day/:locationKey',
  FIVE_DAYS_FORECAST: '/forecasts/v1/daily/5day/:locationKey',
  YESTERDAYS_WEATHER: '/currentconditions/v1/:locationKey/historical/24',
  API_BASE_PATH: 'http://dataservice.accuweather.com',
  API_KEY: 'TPvPdYgL4gc3n5sr7spv4LhJrU3KpELC',
  LANGUAGE: 'pl',
}
