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

  getWeatherIconMessage(data: ApiWeatherResponse): string {
    let icon = '';
    if (data.weather[0].description === 'clear sky') icon = 'soleado ☀';
    if (data.weather[0].description === 'few clouds') icon = 'con algunas nubes ⛅';
    if (data.weather[0].description === 'scattered clouds') icon = 'nublado ☁';
    if (data.weather[0].description === 'broken clouds') icon = 'bastante nublado ☁☁';
    if (data.weather[0].description === 'overcast clouds') icon = 'bastante nublado ☁☁';
    if (data.weather[0].description === 'shower rain') icon = 'empezando a chispear 🌧';
    if (data.weather[0].description === 'rain') icon = 'lluvioso 🌧';
    if (data.weather[0].description === 'thunderstorm') icon = 'con tormentas 🌩';
    if (data.weather[0].description === 'snow') icon = 'nevando ❄';
    if (data.weather[0].description === 'mist') icon = 'con niebla 🌫';

    return icon;
  }
}
