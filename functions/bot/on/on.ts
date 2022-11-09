import { Context, Markup, NarrowedContext } from 'telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';
import { MountMap } from 'telegraf/typings/telegram-types';
import { forecastMessage } from '../data/variables';
import Security from '../security/Security';
import WeatherService from '../services/WeatherService';
import { BotContext } from '../types/types';

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
      text?: string;
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

export const getDefaultMessage = async (ctx: BotContext): Promise<Message.TextMessage> => {
  const context = ctx as typeof ctx & MessageResponse;

  // Check location
  if (context.update.message.location !== undefined) {
    const latitude = context.update.message.location.latitude;
    const longitude = context.update.message.location.longitude;

    try {
      const weatherService = new WeatherService();
      const { data } = await weatherService.getWeatherByLatLong(latitude, longitude);
      const city = data.name;
      const country = data.sys.country;
      const temp = data.main.temp;
      const icon = weatherService.getWeatherIconMessage(data.weather[0].id);

      if (context.session === undefined) {
        context.session ??= { location: { latitude, longitude, city, country, temp, icon } };
      }

      await context.reply(
        'Comandos disponibles para el tiempo',
        Markup.keyboard([['/tiempo5'], ['/nuevaubicacion']])
          .oneTime()
          .resize()
      );

      return await context.reply(forecastMessage(city, country, temp, icon), {
        parse_mode: 'Markdown',
      });
    } catch (err) {
      console.log(err);
    }
  }

  return await context.reply(
    'El Joserrabot no es capaz de entener lo que dices, prueba a escribir /start para ver los comandos disponibles'
  );
};
