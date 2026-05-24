import React, { useEffect, useState } from 'react';
import { Cloud, Sun, CloudRain, CloudLightning, Wind, Thermometer } from 'lucide-react';
import { DAILY_WEATHER_DATA } from '../data/weatherData';

interface WeatherProps {
  location: string;
  day?: number;
}

export const WeatherWidget: React.FC<WeatherProps> = ({ location, day }) => {
  const [weather, setWeather] = useState<{ temp: number; condition: string } | null>(() => {
    if (day !== undefined && DAILY_WEATHER_DATA[day]) {
      const d = DAILY_WEATHER_DATA[day];
      return { temp: d.temp, condition: d.condition };
    }
    return null;
  });

  useEffect(() => {
    // If day is provided, we already initialized or updated it synchronously
    if (day !== undefined && DAILY_WEATHER_DATA[day]) {
      const d = DAILY_WEATHER_DATA[day];
      setWeather({ temp: d.temp, condition: d.condition });
      return;
    }

    // Fallback: Mocking weather data for Iceland
    const mockTemps: Record<string, number> = {
      'Grindavik': 4,
      'Selfoss': 2,
      'Vik': 3,
      'Hofn': 1,
      'Akureyri': -2,
      'Reykjavik': 5,
      'Keflavik': 7,
      'Gullfoss': 6,
      'Snæfellsnes': 5,
      'Myvatn': 5
    };

    const timer = setTimeout(() => {
      const temp = mockTemps[location] || 3;
      setWeather({
        temp,
        condition: Math.random() > 0.5 ? 'Cloudy' : 'Rainy'
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [location, day]);

  if (!weather) return <div className="h-8 w-24 animate-pulse bg-gray-200 rounded-full" />;

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'Sunny':
        return <Sun className="w-4 h-4 text-amber-500" />;
      case 'Partly Cloudy':
        return <Cloud className="w-4 h-4 text-blue-300" />;
      case 'Cloudy':
        return <Cloud className="w-4 h-4 text-gray-400" />;
      case 'Rainy':
        return <CloudRain className="w-4 h-4 text-blue-500" />;
      case 'Windy':
        return <Wind className="w-4 h-4 text-teal-400" />;
      case 'Foggy':
        return <Cloud className="w-4 h-4 text-slate-400" />;
      default:
        return <Cloud className="w-4 h-4 text-accent" />;
    }
  };

  // Convert condition name to traditional Chinese for local feel matching user preferences, if helpful
  const getConditionLabel = (condition: string) => {
    switch (condition) {
      case 'Sunny': return '晴天';
      case 'Partly Cloudy': return '多雲時晴';
      case 'Cloudy': return '陰天';
      case 'Rainy': return '有雨';
      case 'Windy': return '大風';
      case 'Foggy': return '有霧';
      default: return condition;
    }
  };

  return (
    <div className="flex items-center gap-2 text-sm font-medium text-accent">
      {getWeatherIcon(weather.condition)}
      <span>{weather.temp}°C</span>
      <span className="opacity-50">|</span>
      <span>{getConditionLabel(weather.condition)}</span>
    </div>
  );
};

