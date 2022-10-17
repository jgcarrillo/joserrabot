import { Context, Telegraf } from 'telegraf';
import { Message, Update } from 'telegraf/typings/core/types/typegram';

import { birthdaysMessage } from '../data/variables';
import BusService from '../services/BusService';
import WeatherService from '../services/WeatherService';

/**
 * This function generates an invitation link to the group
 * @param {Context} ctx - The context of the message
 * @returns {Promise<Message.TextMessage>} - The bot response with the invitation link
 */
export const getInvitationLink = async (ctx: Context): Promise<Message.TextMessage> => {
  const context = ctx as typeof ctx & { message: string };

  if (context.message.chat.type === 'private')
    return await ctx.reply('ℹ Necesitas estar en un grupo para crear un link de invitación ℹ');

  const res = await ctx.telegram.createChatInviteLink(context.message.chat.id);

  return await ctx.reply(`Aquí tienes tu invitación: ${res.invite_link}`);
};

/**
 * This function returns a list of birthdays
 * @param {Context} ctx - The context of the message
 * @param {Telegraf<Context<Update>>} bot - The bot instance
 * @returns {Promise<Message.TextMessage>} - The bot response with the birthdays list
 */
export const getBirthdays = async (
  ctx: Context,
  bot: Telegraf<Context<Update>>
): Promise<Message.TextMessage> => {
  const context = ctx as typeof ctx & { chat: number };
  return await bot.telegram.sendMessage(context.chat.id, birthdaysMessage, {
    parse_mode: 'Markdown',
  });
};

/**
 * This function returns the current weather for the city passed as argument
 * @param {Context} ctx - The context of the message
 * @returns {Promise<Message.TextMessage | undefined>} - The bot response with the weather
 */
export const getWeather = async (ctx: Context): Promise<Message.TextMessage | undefined> => {
  const weatherService = new WeatherService('Murcia');

  try {
    const { data } = await weatherService.getWeather();
    const zone = weatherService.getZone();

    // Check for weather icon
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

    return await ctx.reply(
      `La temperatura en ${zone} es de: ${data.main.temp} °C. El tiempo está ${icon}`
    );
  } catch (err) {
    console.log(err);
  }
};

/**
 * This function returns the bus stations
 * @param {Context} ctx - The context of the message
 * @returns {Promise<Message.TextMessage | undefined>} - The bot response with the bus stations
 */
export const getBus = async (ctx: Context): Promise<Message.TextMessage | undefined> => {
  const busService = new BusService(undefined, undefined, '44.A.1');

  try {
    const { data } = await busService.getDataByLine();

    return await ctx.reply(`La ruta elegida es: ${data[0].id} - ${data[0].name}`);
  } catch (err) {
    console.log(err);
  }
};
