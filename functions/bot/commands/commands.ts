import { Context, Telegraf } from 'telegraf';
import { Message, Update } from 'telegraf/typings/core/types/typegram';

import { birthdaysMessage, weatherMessage } from '../data/variables';
import BusService from '../services/BusService';

export const getInvitationLink = async (ctx: Context): Promise<Message.TextMessage> => {
  const context = ctx as typeof ctx & { message: string };

  if (context.message.chat.type === 'private')
    return await ctx.reply('ℹ Necesitas estar en un grupo para crear un link de invitación ℹ');

  const res = await ctx.telegram.createChatInviteLink(context.message.chat.id);

  return await ctx.reply(`Aquí tienes tu invitación: ${res.invite_link}`);
};

export const getBirthdays = async (
  ctx: Context,
  bot: Telegraf<Context<Update>>
): Promise<Message.TextMessage> => {
  const context = ctx as typeof ctx & { chat: number };
  return await bot.telegram.sendMessage(context.chat.id, birthdaysMessage, {
    parse_mode: 'Markdown',
  });
};

export const getWeatherMessage = async (
  ctx: Context,
  bot: Telegraf<Context<Update>>
): Promise<Message.TextMessage> => {
  const context = ctx as typeof ctx & { chat: number };
  return await bot.telegram.sendMessage(context.chat.id, weatherMessage, {
    parse_mode: 'Markdown',
  });
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
