import { JOMFRULAND_POSITION } from "./constants";
import type { WeatherResponse } from "../types/weather";

export async function getWeatherData(): Promise<WeatherResponse> {
  const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${JOMFRULAND_POSITION[0]}&lon=${JOMFRULAND_POSITION[1]}`;
  const response = await fetch(url);
  return response.json();
}
