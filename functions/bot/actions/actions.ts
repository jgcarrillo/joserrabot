import { Context, Telegraf } from 'telegraf';
import { Message, Update } from 'telegraf/typings/core/types/typegram';
import { welcomeMessage, helpMessage } from '../data/variables';

/**
 * This is the 'start' action of the bot
 * @param {Context} ctx - The context of the message
 * @param {Telegraf<Context<Update>>} bot - The bot instance
 * @returns {Promise<Message.TextMessage>} - The bot response
 */
export const actionStart = async (
  ctx: Context,
  bot: Telegraf<Context<Update>>
): Promise<Message.TextMessage> => {
  const context = ctx as typeof ctx & { chat: number };
  return await bot.telegram.sendMessage(context.chat.id, welcomeMessage, {
    parse_mode: 'Markdown',
  });
};

/**
 * This is the 'help' action of the bot
 * @param {Context} ctx - The context of the message
 * @param {Telegraf<Context<Update>>} bot - The bot instance
 * @returns {Promise<Message.TextMessage>} - The bot response
 */
export const actionHelp = async (
  ctx: Context,
  bot: Telegraf<Context<Update>>
): Promise<Message.TextMessage> => {
  const context = ctx as typeof ctx & { chat: number };
  return await bot.telegram.sendMessage(context.chat.id, helpMessage, { parse_mode: 'Markdown' });
};
