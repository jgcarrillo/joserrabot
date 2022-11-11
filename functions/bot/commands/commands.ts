import { Context, Markup } from 'telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';

import { reminderMessage, weatherMessage } from '../data/variables';
import BusService from '../services/BusService';
import { checkForMessage } from '../on/on';
import { BotContext } from '../types/types';

export const getInvitationLink = async (ctx: Context): Promise<Message.TextMessage> => {
  const context = ctx as typeof ctx & { message: string };

  if (context.message.chat.type === 'private')
    return await ctx.reply('ℹ Necesitas estar en un grupo para crear un link de invitación ℹ');

  const res = await ctx.telegram.createChatInviteLink(context.message.chat.id);

  return await ctx.reply(`Aquí tienes tu invitación: ${res.invite_link}`);
};

export const setReminder = async (ctx: Context): Promise<Message.TextMessage> => {
  return await ctx.reply(reminderMessage, { parse_mode: 'Markdown' });
};

export const getWeatherMessage = async (ctx: Context): Promise<Message.TextMessage> => {
  return await ctx.reply(
    weatherMessage,
    Markup.keyboard([Markup.button.locationRequest('Send location')]).resize()
  );
};

export const getBus = async (ctx: Context): Promise<Message.TextMessage | undefined> => {
  const busService = new BusService(undefined, undefined, '44.A.1');

  try {
    const { data } = await busService.getDataByLine();

    return await ctx.reply(`La ruta elegida es: ${data[0].id} - ${data[0].name}`);
  } catch (err) {
    console.log(err);
  }
};

export const getNewLocation = async (ctx: BotContext): Promise<Message.TextMessage | undefined> => {
  // Check for message agai because I need to check if /nuevaubicacion exists in the message context
  return await checkForMessage(ctx);
};
