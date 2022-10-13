import { Context, Telegraf } from 'telegraf';
import { Message, Update } from 'telegraf/typings/core/types/typegram';

import { birthdaysMessage } from '../data/variables';

export const getInvitationLink = async (ctx: Context): Promise<Message.TextMessage> => {
  const context = ctx as typeof ctx & { message: string };
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
