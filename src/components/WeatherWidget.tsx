import React, { useEffect, useState } from 'react';
import { Cloud, Sun, CloudRain, CloudLightning, Wind, Thermometer } from 'lucide-react';

interface WeatherProps {
  location: string;
}

export const WeatherWidget: React.FC<WeatherProps> = ({ location }) => {
  const [weather, setWeather] = useState<{ temp: number; condition: string } | null>(null);

  useEffect(() => {
    // Mocking weather data for Iceland
    // In a real app, we would fetch from OpenWeatherMap or similar
    const mockTemps: Record<string, number> = {
      'Grindavik': 4,
      'Selfoss': 2,
      'Vik': 3,
      'Hofn': 1,
      'Akureyri': -2,
      'Reykjavik': 5
    };

    const timer = setTimeout(() => {
      setWeather({
        temp: mockTemps[location] || 3,
        condition: Math.random() > 0.5 ? 'Cloudy' : 'Rainy'
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [location]);

  if (!weather) return <div className="h-8 w-24 animate-pulse bg-gray-200 rounded-full" />;

  return (
    <div className="flex items-center gap-2 text-xs font-medium text-accent">
      <Cloud className="w-4 h-4" />
      <span>{weather.temp}°C</span>
      <span className="opacity-50">|</span>
      <span>{weather.condition}</span>
    </div>
  );
};
