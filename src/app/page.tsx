"use client";

import { useLiveWeather } from "@/lib/useWeather";
import { getDailyForecasts } from "@/lib/utils";
import { WeatherTile } from "@/components/WeatherTile";
import { PageLoader } from "@/components/PageLoader";

export default function Home() {
  const { data: weather, loading } = useLiveWeather();

  if (loading) {
    return <PageLoader />;
  }

  const dailyForecasts = getDailyForecasts(weather?.properties.timeseries);

  return (
    <main className="container min-h-screen">
      <header className="text-3xl font-semibold text-center text-gray-800 my-8">
        <h1>7-dagers værvarsel for Sørhagen</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {dailyForecasts.map((forecast) => (
          <WeatherTile
            key={forecast.time}
            data={forecast.data}
            time={forecast.time}
          />
        ))}
      </div>

      {weather && dailyForecasts.length === 0 && (
        <div className="text-gray-600">Ingen værdata tilgjengelig</div>
      )}

      <footer className="my-8 text-sm text-gray-500 text-center">
        Sist oppdatert:{" "}
        {weather &&
          new Date(weather.properties.meta.updated_at).toLocaleString("nb-NO")}
      </footer>
    </main>
  );
}
