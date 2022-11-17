import axios, { AxiosResponse } from 'axios';
import { codes } from '../data/weatherConditionsIds';
import { ApiForecastResponse, ApiWeatherResponse } from '../types/types';

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

  async getForecast(lat?: number, long?: number): Promise<AxiosResponse<ApiForecastResponse>> {
    this.url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${this.token}&units=metric`;
    return await axios.get(this.url);
  }

  static getWeatherIconMessage(data: number): string {
    let icon = '';

    codes.forEach((elem) => {
      if (elem.id === data) icon = elem.translation;
    });

    return icon;
  }
}
