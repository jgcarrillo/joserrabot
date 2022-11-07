import axios, { AxiosResponse } from 'axios';

interface ApiWeatherResponse {
  weather: Weather[];
  main: Main;
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

export default class WeatherService {
  private readonly token: string;
  private readonly zone: string;
  private readonly url: string;

  constructor(zone: string) {
    this.token = process.env.WEATHER_TOKEN ?? '';
    this.zone = zone;
    this.url = `https://api.openweathermap.org/data/2.5/weather?q=${this.zone}&APPID=${this.token}&units=metric`;
  }

  async getWeather(): Promise<AxiosResponse<ApiWeatherResponse>> {
    return await axios.get(this.url);
  }

  getZone(): string {
    return this.zone;
  }
}
