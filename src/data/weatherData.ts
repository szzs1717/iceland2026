export interface DayWeather {
  temp: number;
  condition: 'Sunny' | 'Partly Cloudy' | 'Cloudy' | 'Rainy' | 'Windy' | 'Foggy';
  sunrise: string;
  sunset: string;
  daylight: string;
}

export const DAILY_WEATHER_DATA: Record<number, DayWeather> = {
  0: { temp: 7, condition: 'Cloudy', sunrise: '04:05', sunset: '23:18', daylight: '19h 13m' },
  1: { temp: 8, condition: 'Sunny', sunrise: '04:02', sunset: '23:21', daylight: '19h 19m' },
  2: { temp: 6, condition: 'Windy', sunrise: '04:00', sunset: '23:25', daylight: '19h 25m' },
  3: { temp: 5, condition: 'Rainy', sunrise: '03:56', sunset: '23:29', daylight: '19h 33m' },
  4: { temp: 4, condition: 'Cloudy', sunrise: '03:48', sunset: '23:38', daylight: '19h 50m' },
  5: { temp: 5, condition: 'Sunny', sunrise: '03:46', sunset: '23:42', daylight: '19h 56m' },
  6: { temp: 6, condition: 'Foggy', sunrise: '03:45', sunset: '23:35', daylight: '19h 50m' },
  7: { temp: 7, condition: 'Rainy', sunrise: '03:48', sunset: '23:31', daylight: '19h 43m' },
  8: { temp: 9, condition: 'Partly Cloudy', sunrise: '03:46', sunset: '23:38', daylight: '19h 52m' },
  9: { temp: 10, condition: 'Sunny', sunrise: '03:43', sunset: '23:41', daylight: '19h 58m' },
  10: { temp: 8, condition: 'Partly Cloudy', sunrise: '03:41', sunset: '23:44', daylight: '20h 03m' }
};
