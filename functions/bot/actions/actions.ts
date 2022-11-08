import { Context, Telegraf } from 'telegraf';
import { Message, Update } from 'telegraf/typings/core/types/typegram';
import { welcomeMessage, helpMessage } from '../data/variables';
import WeatherService from '../services/WeatherService';

interface CallbackQueryResponse {
  update: {
    update_id: string;
    callback_query: {
      id: string;
      from: unknown;
      message: unknown;
      chat_instance: string;
      data: string;
    };
  };
}

export const actionStart = async (
  ctx: Context,
  bot: Telegraf<Context<Update>>
): Promise<Message.TextMessage> => {
  const context = ctx as typeof ctx & { chat: number };
  return await bot.telegram.sendMessage(context.chat.id, welcomeMessage, {
    parse_mode: 'Markdown',
  });
};

export const actionHelp = async (
  ctx: Context,
  bot: Telegraf<Context<Update>>
): Promise<Message.TextMessage> => {
  const context = ctx as typeof ctx & { chat: number };
  return await bot.telegram.sendMessage(context.chat.id, helpMessage, { parse_mode: 'Markdown' });
};

export const actionWeatherMessage = async (
  ctx: Context
): Promise<Message.TextMessage | undefined> => {
  const context = ctx as typeof ctx & CallbackQueryResponse;

  await context.answerCbQuery();

  const city = context.update.callback_query.data;
  const weatherService = new WeatherService(city);

  try {
    const { data } = await weatherService.getWeather();
    const zone = weatherService.getZone();
    const icon = weatherService.getWeatherIconMessage(data);

    return await context.reply(
      `La temperatura en ${zone} es de: ${data.main.temp} °C. El tiempo está ${icon}`
    );
  } catch (err) {
    console.log(err);
  }
};
