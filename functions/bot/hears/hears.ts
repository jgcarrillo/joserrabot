import { Message } from 'telegraf/typings/core/types/typegram';
import WeatherService from '../services/WeatherService';
import { BotContext } from '../types/types';

export const getForecastForFiveDays = async (
  ctx: BotContext
): Promise<Message.TextMessage | undefined> => {
  if (ctx.session === undefined) {
    return await ctx.reply(
      'Por favor, prueba antes usando el comando /tiempo y mandando tu localización'
    );
  }
  const lat = ctx.session.location?.latitude;
  const long = ctx.session.location?.longitude;

  const weatherService = new WeatherService();
  const { data } = await weatherService.getForecastForFiveDays(lat, long);

  const weatherDataForFiveDays = [];
  let message = '';
  weatherDataForFiveDays.push(data.list);
  weatherDataForFiveDays.forEach((listElem) => {
    listElem.forEach((weatherList) => {
      const dateHour = weatherList.dt_txt.toString().split(' ');
      const [date, hour] = dateHour;

      // TODO: it's necessary to do another loop over the weather. FIX it!!
      // TODO: create a function to control the Date format
      // const icon = weatherService.getWeatherIconMessage(weatherList.weather)

      message += `Fecha: ${date} - Hora: ${hour} -  `;
    });
  });

  return await ctx.reply(message);
};
