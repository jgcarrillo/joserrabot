import { Context, Markup, NarrowedContext } from 'telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';
import { MountMap } from 'telegraf/typings/telegram-types';
import { defaultMessage, forecastMessage } from '../data/variables';
import Security from '../security/Security';
import WeatherService from '../services/WeatherService';
import { BotContext, MessageResponse } from '../types/types';

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
  const regexCityCountry = /[A-Za-z]\/[A-Za-z]{2}/;

  // Get weather with the format city/COUNTRY for example Murcia/ES
  if (context.update.message.text !== undefined) {
    if (regexCityCountry.test(context.update.message.text)) {
      try {
        const zone = context.update.message.text.split('/')[0];

        // TODO: Refactor this because it's the same in check location function below
        const weatherService = new WeatherService();
        const { data } = await weatherService.getWeatherByZone(zone);
        const city = data.name;
        const country = data.sys.country;
        const temp = data.main.temp;
        const icon = WeatherService.getWeatherIconMessage(data.weather[0].id);
        const latitude = data.coord.lat;
        const longitude = data.coord.lon;

        context.session = { location: { latitude, longitude, city, country, temp, icon } };

        await context.reply(
          'Aquí tienes tu consulta. También tienes otros comandos disponibles en el menú de abajo.',
          Markup.keyboard([['/tiempo3'], ['/nuevaubicacion']])
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
  }

  // Check /nuevaubicacion command
  if (context.update.message.text === '/nuevaubicacion') {
    return await ctx.reply(
      'Mándame la nueva ubicación',
      Markup.keyboard([Markup.button.locationRequest('Send location')]).resize()
    );
  }

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
      const icon = WeatherService.getWeatherIconMessage(data.weather[0].id);

      if (context.session === undefined) {
        context.session = { location: { latitude, longitude, city, country, temp, icon } };
      }

      await context.reply(
        'Aquí tienes tu consulta. También tienes otros comandos disponibles en el menú de abajo.',
        Markup.keyboard([['/tiempo3'], ['/nuevaubicacion']])
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

  // If the message is different from a location or a /nuevaubicacion command, reply with this
  return await context.reply(defaultMessage);
};
