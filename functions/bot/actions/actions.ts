import { Context, Telegraf } from 'telegraf';
import { Message, Update } from 'telegraf/typings/core/types/typegram';
import { welcomeMessage, helpMessage } from '../data/variables';

export const actionStart: (
  ctx: Context,
  bot: Telegraf<Context<Update>>
) => Promise<Message.TextMessage> = async (ctx, bot) => {
  const context = ctx as typeof ctx & { chat: number };
  return await bot.telegram.sendMessage(context.chat.id, welcomeMessage, {
    parse_mode: 'Markdown',
  });
};

export const actionHelp: (
  ctx: Context,
  bot: Telegraf<Context<Update>>
) => Promise<Message.TextMessage> = async (ctx, bot) => {
  const context = ctx as typeof ctx & { chat: number };
  return await bot.telegram.sendMessage(context.chat.id, helpMessage, { parse_mode: 'Markdown' });
};
