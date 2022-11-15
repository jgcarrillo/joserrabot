import { CommandContext, Context, Keyboard, SessionFlavor } from 'grammy';
import { Message } from 'grammy/out/types';
import { helpMessage, reminderMessage, weatherMessage, welcomeMessage } from '../data/variables';
import { insertReminderIntoDatabase } from '../database/database';
import { formatForecast } from '../helpers/helpers';
import BusService from '../services/BusService';
import WeatherService from '../services/WeatherService';
import {
  ConversationContext,
  MessageResponse,
  MyConversation,
  SessionGrammy,
} from '../types/types';

export const commandStart = async (ctx: CommandContext<Context>): Promise<Message.TextMessage> => {
  return await ctx.reply(welcomeMessage, { parse_mode: 'MarkdownV2' });
};

export const commandHelp = async (ctx: Context): Promise<Message.TextMessage> => {
  return await ctx.reply(helpMessage, { parse_mode: 'MarkdownV2' });
};

export const commandGetBus = async (ctx: Context): Promise<Message.TextMessage | undefined> => {
  const busService = new BusService(undefined, undefined, '44.A.1');

  try {
    const { data } = await busService.getDataByLine();
    return await ctx.reply(`La ruta elegida es: ${data[0].id} - ${data[0].name}`);
  } catch (err) {
    console.log(err);
  }
};

export const commandGetInvitationLink = async (ctx: Context): Promise<Message.TextMessage> => {
  const context = ctx as typeof ctx & { message: string };

  if (context.message.chat.type === 'private') {
    return await ctx.reply('ℹ Necesitas estar en un grupo para crear un link de invitación ℹ');
  }

  const link = await ctx.exportChatInviteLink();
  return await ctx.reply(`Aquí tienes tu link de invitación: ${link}`);
};

export const commandSetReminder = async (ctx: Context): Promise<Message.TextMessage> => {
  return await ctx.reply(reminderMessage, { parse_mode: 'MarkdownV2' });
};

export const commandGetWeatherMessage = async (ctx: Context): Promise<Message.TextMessage> => {
  const keyboard = new Keyboard().requestLocation('Manda tu localización').row().resized();
  return await ctx.reply(weatherMessage, { reply_markup: keyboard, parse_mode: 'MarkdownV2' });
};

export const commandgetListOfReminders = async (
  ctx: Context
): Promise<Message.TextMessage | undefined> => {
  const context = ctx as typeof ctx & MessageResponse;
  return await context.reply('*Listado de los recordatorios para el usuario*', {
    parse_mode: 'MarkdownV2',
  });
};

export const commandDeleteReminder = async (
  ctx: Context
): Promise<Message.TextMessage | undefined> => {
  const context = ctx as typeof ctx & MessageResponse;
  return await context.reply('Eliminar alguno de los siguientes recordatorios');
};

export const commandNewLocation = async (
  ctx: Context
): Promise<Message.TextMessage | undefined> => {
  const keyboard = new Keyboard().requestLocation('Manda tu localización').row().resized();
  return await ctx.reply(weatherMessage, { reply_markup: keyboard });
};

export const onGetForecast = async (ctx: Context): Promise<Message.TextMessage | undefined> => {
  const context = ctx as typeof ctx & SessionFlavor<SessionGrammy>;

  if (context.session.location?.latitude === 0 && context.session.location.longitude === 0) {
    return await ctx.reply(
      'Por favor, prueba antes usando el comando /tiempo y mandando tu localización.'
    );
  }
  const lat = context.session.location?.latitude;
  const long = context.session.location?.longitude;
  const city = context.session.location?.city;
  const country = context.session.location?.country;

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

export const createNewReminder = async (
  conversation: MyConversation,
  ctx: ConversationContext
): Promise<Message.TextMessage | undefined> => {
  const userID = ctx.update.message?.from?.id;
  const userName = ctx.update.message?.from?.first_name;

  await ctx.reply('Dime el *nombre* del recordatorio', { parse_mode: 'MarkdownV2' });
  const name = await conversation.waitFor(':text');

  await ctx.reply('Dime el *contenido* del recordatorio', { parse_mode: 'MarkdownV2' });
  const value = await conversation.waitFor(':text');

  await insertReminderIntoDatabase(
    userName,
    userID,
    name.update.message.text,
    value.update.message.text
  );

  return await ctx.reply('¡Recordatorio añadido correctamente\\!', { parse_mode: 'MarkdownV2' });
};
