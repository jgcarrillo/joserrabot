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

export default class WeatherService {
  private readonly token: string;
  private zone: string;
  private url: string;

  constructor() {
    this.token = process.env.WEATHER_TOKEN ?? '';
    this.zone = '';
    this.url = '';
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

  getZone(): string {
    return this.zone;
  }

  getUrl(): string {
    return this.url;
  }

  getWeatherIconMessage(data: ApiWeatherResponse): string {
    let icon = '';

    codes.forEach((elem) => {
      if (elem.id === data.weather[0].id) icon = elem.translation;
    });

    return icon;
  }
}
