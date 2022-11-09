import { Context } from 'telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';
import { welcomeMessage, helpMessage } from '../data/variables';

export const actionStart = async (ctx: Context): Promise<Message.TextMessage> => {
  return await ctx.reply(welcomeMessage, { parse_mode: 'Markdown' });
};

export const actionHelp = async (ctx: Context): Promise<Message.TextMessage> => {
  return await ctx.reply(helpMessage, { parse_mode: 'Markdown' });
};
