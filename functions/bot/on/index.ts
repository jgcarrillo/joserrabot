import { Context, NarrowedContext } from 'telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';
import { MountMap } from 'telegraf/typings/telegram-types';

export const getUserGreeting = async (
  ctx: NarrowedContext<Context, MountMap['new_chat_members']>
): Promise<Message.TextMessage> => {
  let greeting = '';

  for (const user of ctx.message?.new_chat_members) {
    greeting = `${user.first_name} se acaba de unir al grupo ✌✌`;
  }

  return await ctx.reply(greeting);
};
