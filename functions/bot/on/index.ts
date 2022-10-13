import { Context, NarrowedContext } from 'telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';
import { MountMap } from 'telegraf/typings/telegram-types';

export const getUserGreeting = async (
  ctx: NarrowedContext<Context, MountMap['new_chat_members']>
): Promise<Message.TextMessage> => {
  // Prevent add the bot to another group
  if (ctx.chat.id !== -879681710) {
    await ctx.reply('El bot se salió del grupo');
    await ctx.telegram.leaveChat(ctx.message.chat.id);
  }

  let greeting = '';

  for (const user of ctx.message?.new_chat_members) {
    greeting = `${user.first_name} se acaba de unir al grupo ✌✌`;
  }

  return await ctx.reply(greeting);
};
