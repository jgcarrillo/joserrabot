import { ApiForecastResponse } from '../types/types';
import WeatherService from '../services/WeatherService';

export const formatForecast = (data: ApiForecastResponse, index: number): string => {
  // to add the year simply add ${data.list[index].dt_txt.substring(0, 4)}
  const dateAndHourFormat = `${data.list[index].dt_txt.substring(8, 10)}/${data.list[
    index
  ].dt_txt.substring(5, 7)} ${data.list[index].dt_txt.substring(11, 13)}h`;

  const tempFormat = `${data.list[index].main.temp_min} °C - ${data.list[index].main.temp_max} °C`;

  const weatherIconFormat = `${WeatherService.getWeatherIconMessage(
    data.list[index].weather[0].id
  )}`;

  return `${dateAndHourFormat}: *${tempFormat}*, ${weatherIconFormat}\n`;
};
