import axios, { AxiosResponse } from 'axios';
import { codes } from '../data/weatherConditionsIds';

interface ApiWeatherResponse {
  weather: Weather[];
  main: Main;
  sys: SystemData;
  name: string;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface SystemData {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

interface WeatherApiResponse {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherList[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

interface WeatherList {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: Weather[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  rain: {
    '3h': number;
  };
  sys: {
    pod: string;
  };
  dt_txt: Date;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export default class WeatherService {
  private readonly token: string;
  private zone: string;
  private url: string;

  constructor() {
    this.token = process.env.WEATHER_TOKEN ?? '';
    this.zone = '';
    this.url = '';
  }

  getZone(): string {
    return this.zone;
  }

  getUrl(): string {
    return this.url;
  }

  async getWeatherByZone(zone: string): Promise<AxiosResponse<ApiWeatherResponse>> {
    this.zone = zone;
    this.url = `https://api.openweathermap.org/data/2.5/weather?q=${zone}&APPID=${this.token}&units=metric`;
    return await axios.get(this.url);
  }

  async getWeatherByLatLong(lat: number, long: number): Promise<AxiosResponse<ApiWeatherResponse>> {
    this.url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${this.token}&units=metric`;
    return await axios.get(this.url);
  }

  async getForecastForFiveDays(
    lat?: number,
    long?: number
  ): Promise<AxiosResponse<WeatherApiResponse>> {
    this.url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${this.token}&units=metric`;
    return await axios.get(this.url);
  }

  getWeatherIconMessage(data: number): string {
    let icon = '';

    codes.forEach((elem) => {
      if (elem.id === data) icon = elem.translation;
    });

    return icon;
  }
}
