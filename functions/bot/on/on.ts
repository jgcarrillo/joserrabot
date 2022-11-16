import { Context, SessionFlavor } from 'grammy';
import { Message } from 'grammy/out/types';
import { defaultMessage, forecastMessage } from '../data/messages';
import { createKeyboard } from '../helpers/helpers';
import Security from '../security/Security';
import WeatherService from '../services/WeatherService';
import { MessageResponse, SessionGrammy } from '../types/types';

export const onGetLocation = async (ctx: Context): Promise<Message.TextMessage | undefined> => {
  const context = ctx as typeof ctx & MessageResponse & SessionFlavor<SessionGrammy>;

  // Check location
  const latitude = context.update.message.location.latitude;
  const longitude = context.update.message.location.longitude;

  try {
    const weatherService = new WeatherService();
    const { data } = await weatherService.getWeatherByLatLong(latitude, longitude);
    const city = data.name;
    const country = data.sys.country;
    const temp = data.main.temp;
    const icon = WeatherService.getWeatherIconMessage(data.weather[0].id);

    context.session.location = { latitude, longitude, city, country, temp, icon };

    await createKeyboard(context);

    return await context.reply(forecastMessage(city, country, temp, icon), {
      parse_mode: 'Markdown',
    });
  } catch (err) {
    console.log(err);
  }
};

// This function will check for every message you sent to the bot
export const onCheckForTextMessages = async (
  ctx: Context
): Promise<Message.TextMessage | undefined> => {
  const context = ctx as typeof ctx & MessageResponse & SessionFlavor<SessionGrammy>;

  const regexCityCountry = /[A-Za-z]\/\btiempo\b/;

  // Get weather with the format city/COUNTRY for example Murcia/ES
  if (context.update.message.text !== undefined) {
    if (regexCityCountry.test(context.update.message.text)) {
      try {
        const zone = context.update.message.text.split('/')[0];

        const weatherService = new WeatherService();
        const { data } = await weatherService.getWeatherByZone(zone);

        const city = data.name;
        const country = data.sys.country;
        const temp = data.main.temp;
        const icon = WeatherService.getWeatherIconMessage(data.weather[0].id);
        const latitude = data.coord.lat;
        const longitude = data.coord.lon;

        context.session.location = { latitude, longitude, city, country, temp, icon };

        await createKeyboard(context);

        return await context.reply(forecastMessage(city, country, temp, icon), {
          parse_mode: 'Markdown',
        });
      } catch (err) {
        console.log(err);

        return await ctx.reply('Por favor, asegúrate de introducir bien el *nombre de la ciudad*', {
          parse_mode: 'MarkdownV2',
        });
      }
    }
  }

  // If the message is different from a location or a /nuevaubicacion command, reply with this
  // Probably uncomment this line below if you want to use the bot in a group
  // otherwise the bot automatically reply every time you send a message different from
  // a location or /nuevaubicacion command
  return await context.reply(defaultMessage, { parse_mode: 'MarkdownV2' });
};

export const onGetUserGrettings = async (
  ctx: Context
): Promise<Message.TextMessage | undefined> => {
  const security = new Security(-846526315); // <-- Add here the chat IDs allowed
  const isChatInWhitelist = security.isChatInTheWhitelist(ctx.msg?.chat.id);

  let greeting = '';

  if (!isChatInWhitelist) {
    await ctx.reply('☢ Este no es mi grupo ☢');
    if (ctx.msg?.chat.id !== undefined) await ctx.api.leaveChat(ctx.msg?.chat.id);
    return;
  } else {
    if (ctx.msg?.new_chat_members !== undefined) {
      for (const user of ctx.msg?.new_chat_members) {
        greeting = `${user.first_name} se acaba de unir al grupo ✌✌`;
      }
    }
  }

  return await ctx.reply(greeting);
};
