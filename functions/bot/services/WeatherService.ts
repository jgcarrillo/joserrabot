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

  /**
   *
   * @param {string} zone - The zone for the weather
   */
  constructor(zone: string) {
    this.token = process.env.WEATHER_TOKEN ?? '';
    this.zone = zone;
    this.url = `https://api.openweathermap.org/data/2.5/weather?q=${this.zone}&APPID=${this.token}&units=metric`;
  }

  /**
   * This function returns the current weather data
   * @returns {Promise<AxiosResponse<ApiWeatherResponse>>} - The data for the current weather
   */
  async getWeather(): Promise<AxiosResponse<ApiWeatherResponse>> {
    return await axios.get(this.url);
  }

  /**
   * This function returns the current zone for the weather
   * @returns {string} - The zone for the current weather
   */
  getZone(): string {
    return this.zone;
  }
}
