import axios, { AxiosResponse } from 'axios';

import { WeatherResponse } from '../interfaces/types';

export default class WeatherService {
  private readonly token: string;
  private readonly zone: string;
  private readonly url: string;

  constructor(zone: string) {
    this.token = process.env.WEATHER_TOKEN ?? '';
    this.zone = zone;
    this.url = `https://api.openweathermap.org/data/2.5/weather?q=${this.zone}&APPID=${this.token}&units=metric`;
  }

  async getWeather(): Promise<AxiosResponse<WeatherResponse>> {
    return await axios.get(this.url);
  }

  getZone(): string {
    return this.zone;
  }
}
