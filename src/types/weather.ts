export type WeatherUnit = {
  air_pressure_at_sea_level: string;
  air_temperature: string;
  cloud_area_fraction: string;
  precipitation_amount: string;
  relative_humidity: string;
  wind_from_direction: string;
  wind_speed: string;
};

export type WeatherMeta = {
  updated_at: string;
  units: WeatherUnit;
};

export type WeatherDetails = {
  air_pressure_at_sea_level: number;
  air_temperature: number;
  cloud_area_fraction: number;
  relative_humidity: number;
  wind_from_direction: number;
  wind_speed: number;
};

export type WeatherSummary = {
  symbol_code: string;
};

export type WeatherNextHours = {
  summary: WeatherSummary;
  details?: {
    precipitation_amount?: number;
  };
};

export type WeatherData = {
  instant: {
    details: WeatherDetails;
  };
  next_1_hours?: WeatherNextHours;
  next_6_hours?: WeatherNextHours;
  next_12_hours?: WeatherNextHours;
};

export type WeatherTimeseries = {
  time: string;
  data: WeatherData;
};

export type WeatherGeometry = {
  type: string;
  coordinates: number[];
};

export type WeatherProperties = {
  meta: WeatherMeta;
  timeseries: WeatherTimeseries[];
};

export type WeatherResponse = {
  type: string;
  geometry: WeatherGeometry;
  properties: WeatherProperties;
};
