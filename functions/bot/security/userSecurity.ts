import { Context, SessionFlavor } from 'grammy';
import { Message } from 'grammy/out/types';
import { SessionGrammy } from '../types/types';

export const userAuthentication = async (
  ctx: Context,
  password: string
): Promise<Message.TextMessage | undefined> => {
  const context = ctx as typeof ctx & SessionFlavor<SessionGrammy>;

  if (password.length === 0) {
    return await context.reply(
      'Para usar este commando escribe /password seguido de un espacio y la contraseña',
      {
        parse_mode: 'MarkdownV2',
      }
    );
  }

  if (context.session.password.value !== password) {
    context.session.password.isPasswordCorrect = false;
    return await context.reply('La contraseña introducida no es correcta', {
      parse_mode: 'MarkdownV2',
    });
  }

  context.session.password.isPasswordCorrect = true;
  return await context.reply(
    '¡Contraseña correcta\\! Para ver los comandos disponibles usa /help',
    {
      parse_mode: 'MarkdownV2',
    }
  );
};
