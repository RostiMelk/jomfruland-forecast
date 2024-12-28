import type { WeatherTimeseries } from "@/types/weather";

export const getDailyForecasts = (timeseries?: WeatherTimeseries[]) => {
  if (!timeseries) return [];

  const dailyForecasts = [];
  const now = new Date();
  let foundToday = false;

  for (let i = 0; i < timeseries.length; i++) {
    const forecastTime = new Date(timeseries[i].time);

    if (forecastTime < now) continue;

    // For today, take the first available forecast
    if (!foundToday) {
      dailyForecasts.push(timeseries[i]);
      foundToday = true;
      continue;
    }

    // For other days, take the 13:00 forecast
    if (forecastTime.getHours() === 13) {
      dailyForecasts.push(timeseries[i]);
      if (dailyForecasts.length >= 7) break;
    }
  }

  return dailyForecasts;
};

export const getTimeLabel = (date: string) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const forecastDate = new Date(date);

  if (forecastDate.toDateString() === today.toDateString()) {
    return "Akkurat nå";
  }

  if (forecastDate.toDateString() === tomorrow.toDateString()) {
    return "I morgen";
  }

  return new Date(date)
    .toLocaleDateString("nb-NO", {
      weekday: "long",
      day: "numeric",
      month: "long",
    })
    .replace(/^./, (str) => str.toUpperCase());
};

export const getDirection = (degrees: number): string => {
  const directions = [
    "Nord",
    "Nord-nordøst",
    "Nordøst",
    "Øst-nordøst",
    "Øst",
    "Øst-sørøst",
    "Sørøst",
    "Sør-sørøst",
    "Sør",
    "Sør-sørvest",
    "Sørvest",
    "Vest-sørvest",
    "Vest",
    "Vest-nordvest",
    "Nordvest",
    "Nord-nordvest",
  ];
  const index = Math.round(((degrees % 360) / 360) * 16);
  return directions[index % 16];
};
