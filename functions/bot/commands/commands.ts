import { Context } from 'telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';

export const getInvitationLink = async (ctx: Context): Promise<Message.TextMessage> => {
  const context = ctx as typeof ctx & { message: string };
  const res = await ctx.telegram.createChatInviteLink(context.message.chat.id);

  return await ctx.reply(`Aquí tienes tu invitación: ${res.invite_link}`);
};
