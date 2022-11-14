import { Message } from 'telegraf/typings/core/types/typegram';
import { formatForecast } from '../helpers/helpers';
import WeatherService from '../services/WeatherService';
import { BotContext } from '../types/types';

export const getForecast = async (ctx: BotContext): Promise<Message.TextMessage | undefined> => {
  console.log(ctx);
  if (ctx.session === undefined) {
    return await ctx.reply(
      'Por favor, prueba antes usando el comando /tiempo y mandando tu localización.'
    );
  }
  const lat = ctx.session.location?.latitude;
  const long = ctx.session.location?.longitude;
  const city = ctx.session.location?.city;
  const country = ctx.session.location?.country;

  const weatherService = new WeatherService();
  const { data } = await weatherService.getForecast(lat, long);

  // I need to set the -19 because Telegram doesn't support too long messages
  // Anyway, the API response includes 5 days forecast
  let message = `La previsión para ${city}, ${country} es:\n\n`;
  for (let i = 0; i < data.list.length - 19; i++) {
    message += formatForecast(data, i);
  }

  return await ctx.reply(message, { parse_mode: 'Markdown' });
};
