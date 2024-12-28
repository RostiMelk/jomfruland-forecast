import {
  Cloud,
  Wind,
  Navigation2,
  Droplets,
  Sun,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
} from "lucide-react";
import type { WeatherData } from "../types/weather";
import { getDirection, getTimeLabel } from "@/lib/utils";

interface WeatherTileProps {
  data: WeatherData;
  time: string;
}

const weatherIcons = {
  default: <Cloud className="size-9 text-gray-500" />,
  clearsky: <Sun className="size-9 text-yellow-500" />,
  rain: <CloudRain className="size-9 text-blue-500" />,
  snow: <CloudSnow className="size-9 text-gray-300" />,
  thunder: <CloudLightning className="size-9 text-yellow-600" />,
  fog: <CloudFog className="size-9 text-gray-500" />,
};

const getWeatherIcon = (symbolCode?: string) => {
  if (!symbolCode) return weatherIcons.default;
  const iconKey = Object.keys(weatherIcons).find((key) =>
    symbolCode.includes(key),
  );
  return (
    weatherIcons[iconKey as keyof typeof weatherIcons] || weatherIcons.default
  );
};

export const WeatherTile: React.FC<WeatherTileProps> = ({ data, time }) => {
  const { instant, next_1_hours, next_6_hours, next_12_hours } = data;
  const precipitationData =
    next_1_hours?.details?.precipitation_amount ??
    next_6_hours?.details?.precipitation_amount ??
    next_12_hours?.details?.precipitation_amount ??
    0;

  const symbolCode =
    next_1_hours?.summary.symbol_code ??
    next_6_hours?.summary.symbol_code ??
    next_12_hours?.summary.symbol_code;

  const timeLabel = getTimeLabel(time);
  const weatherIcon = getWeatherIcon(symbolCode);
  const windDirection = getDirection(instant.details.wind_from_direction);

  return (
    <article className="bg-white rounded-lg border p-4 w-full space-y-2">
      <header className="text-sm font-semibold text-gray-600 truncate">
        <time dateTime={time}>{timeLabel}</time>
      </header>

      <section className="flex items-center justify-between">
        {weatherIcon}
        <p className="text-2xl font-bold text-gray-800">
          {instant.details.air_temperature.toFixed(0)}°
        </p>
      </section>

      <section className="space-y-2 text-sm text-gray-700">
        <article className="flex items-center justify-between flex-wrap">
          <h2 className="flex items-center gap-2">
            <Wind className="size-4" aria-hidden="true" />
            <span>Vind</span>
          </h2>
          <p>{instant.details.wind_speed.toFixed(1)} m/s</p>
        </article>

        <article className="flex items-center justify-between flex-wrap">
          <h2 className="flex items-center gap-2">
            <Navigation2
              className="size-4"
              style={{
                transform: `rotate(${instant.details.wind_from_direction}deg)`,
              }}
              aria-hidden="true"
            />
            <span>Retning</span>
          </h2>
          <p>{windDirection}</p>
        </article>

        <article className="flex items-center justify-between flex-wrap">
          <h2 className="flex items-center gap-2">
            <Droplets className="size-4" aria-hidden="true" />
            <span>Nedbør</span>
          </h2>
          <p>{precipitationData.toFixed(1)} mm</p>
        </article>

        <article className="flex items-center justify-between flex-wrap">
          <h2 className="flex items-center gap-2">
            <Cloud className="size-4" aria-hidden="true" />
            <span>Skydekke</span>
          </h2>
          <p>{instant.details.cloud_area_fraction.toFixed(0)}%</p>
        </article>
      </section>
    </article>
  );
};
