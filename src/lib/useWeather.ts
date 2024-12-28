import { useEffect, useState } from "react";
import { getWeatherData } from "./actions";
import type { WeatherResponse } from "@/types/weather";

const REFRESH_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes

export function useLiveWeather() {
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getWeatherData();
        setData(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    const interval = setInterval(fetchData, REFRESH_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
}
