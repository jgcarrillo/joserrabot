import { Context, NarrowedContext } from 'telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';
import { MountMap } from 'telegraf/typings/telegram-types';
import Security from '../security/Security';

/**
 * This functions returns the bot response when the bot is added to a new group
 * @param {NarrowedContext<Context, MountMap['new_chat_members']>} ctx - The context of the message
 * @returns {Promise<Message.TextMessage | undefined>} - The bot response with the credentials
 */
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
