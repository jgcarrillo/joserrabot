import { Context, NarrowedContext, Telegraf } from 'telegraf';
import { Message, Update } from 'telegraf/typings/core/types/typegram';
import { MountMap } from 'telegraf/typings/telegram-types';
import { forecastMessage } from '../data/variables';
import Security from '../security/Security';
import WeatherService from '../services/WeatherService';

interface MessageResponse {
  update: {
    update_id: string;
    message: {
      message_id: string;
      from: unknown;
      chat: unknown;
      date: string;
      location: {
        latitude: number;
        longitude: number;
      };
    };
  };
}

export const getUserGreeting = async (
  ctx: NarrowedContext<Context, MountMap['new_chat_members']>
): Promise<Message.TextMessage | undefined> => {
  const security = new Security(-822956311);
  const isChatInWhitelist = security.isChatInTheWhitelist(ctx.chat.id);

  let greeting = '';

  if (!isChatInWhitelist) {
    await ctx.reply('☢ Este no es mi grupo ☢');
    await ctx.telegram.leaveChat(ctx.message.chat.id);
    return;
  } else {
    for (const user of ctx.message.new_chat_members) {
      greeting = `${user.first_name} se acaba de unir al grupo ✌✌`;
    }
  }

  return await ctx.reply(greeting);
};

export const getDefaultMessage = async (
  ctx: Context,
  bot: Telegraf<Context<Update>>
): Promise<Message.TextMessage> => {
  const context = ctx as typeof ctx & MessageResponse & { chat: number };

  if (context.update.message.location !== undefined) {
    const latitude = context.update.message.location.latitude;
    const longitude = context.update.message.location.longitude;

    try {
      const weatherService = new WeatherService();
      const { data } = await weatherService.getWeatherByLatLong(latitude, longitude);
      const city = data.name;
      const country = data.sys.country;
      const temp = data.main.temp;
      const icon = weatherService.getWeatherIconMessage(data);

      return await bot.telegram.sendMessage(
        context.chat.id,
        forecastMessage(city, country, temp, icon),
        {
          parse_mode: 'Markdown',
        }
      );
    } catch (err) {
      console.log(err);
    }

    return await context.reply(`${latitude} and ${longitude}`);
  }

  return await context.reply(
    'El Joserrabot no es capaz de entener lo que dices, prueba a escribir /start para ver los comandos disponibles'
  );
};
