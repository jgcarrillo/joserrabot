import { Bot, session, webhookCallback } from 'grammy';
import './database/database';
import * as dotenv from 'dotenv';
import {
  commandDeleteReminder,
  commandGetBus,
  commandGetInvitationLink,
  commandgetListOfReminders,
  commandGetWeatherMessage,
  commandHelp,
  commandNewLocation,
  commandStart,
  commandCreateNewReminder,
  onGetForecast,
  commandReminderMenu,
} from './commands/commands';
import { onCheckForTextMessages, onGetLocation, onGetUserGrettings } from './on/on';
import { ContextGrammy, ConversationContext, SessionGrammy } from './types/types';
import { conversations, createConversation } from '@grammyjs/conversations';
import { userAuthentication } from './security/userSecurity';
import { VercelRequest, VercelResponse } from '@vercel/node';

dotenv.config();

if (process.env.BOT_TOKEN === undefined) {
  throw new TypeError('BOT_TOKEN must be provided!');
}

const token: string = process.env.BOT_TOKEN;
const bot = new Bot<ContextGrammy & ConversationContext>(token);

const initialSession = (): SessionGrammy => {
  return {
    location: { latitude: 0, longitude: 0, city: '', country: '', icon: '', temp: 0 },
    password: { value: process.env.BOT_PASSWORD, isPasswordCorrect: false },
  };
};
bot.use(session({ initial: initialSession }));

bot.use(conversations());

bot.use(createConversation(commandCreateNewReminder));

// Bot security (user) is controlled by this function
bot.command('password', async (ctx) => {
  const password = ctx.match;

  await userAuthentication(ctx, password);
});

bot.command('start', async (ctx) => {
  if (!ctx.session.password.isPasswordCorrect) {
    return await ctx.reply(
      'Introduce la contraseña mediante el comando /password para desbloquear el bot',
      { parse_mode: 'MarkdownV2' }
    );
  }
  await commandStart(ctx);
});

bot.command('help', async (ctx) => {
  if (!ctx.session.password.isPasswordCorrect) {
    return await ctx.reply(
      'Introduce la contraseña mediante el comando /password para desbloquear el bot'
    );
  }
  await commandHelp(ctx);
});

bot.command('tiempo', async (ctx) => {
  if (!ctx.session.password.isPasswordCorrect) {
    return await ctx.reply(
      'Introduce la contraseña mediante el comando /password para desbloquear el bot'
    );
  }
  await commandGetWeatherMessage(ctx);
});

bot.command('recordatorio', async (ctx) => {
  if (!ctx.session.password.isPasswordCorrect) {
    return await ctx.reply(
      'Introduce la contraseña mediante el comando /password para desbloquear el bot'
    );
  }
  await commandReminderMenu(ctx);
});

bot.command('bus', async (ctx) => {
  if (!ctx.session.password.isPasswordCorrect) {
    return await ctx.reply(
      'Introduce la contraseña mediante el comando /password para desbloquear el bot'
    );
  }
  await commandGetBus(ctx);
});

bot.command('invitar', async (ctx) => {
  if (!ctx.session.password.isPasswordCorrect) {
    return await ctx.reply(
      'Introduce la contraseña mediante el comando /password para desbloquear el bot'
    );
  }
  await commandGetInvitationLink(ctx);
});

bot.command('crear', async (ctx) => {
  if (!ctx.session.password.isPasswordCorrect) {
    return await ctx.reply(
      'Introduce la contraseña mediante el comando /password para desbloquear el bot'
    );
  }
  await ctx.conversation.enter('commandCreateNewReminder');
});

bot.command('listar', async (ctx) => {
  if (!ctx.session.password.isPasswordCorrect) {
    return await ctx.reply(
      'Introduce la contraseña mediante el comando /password para desbloquear el bot'
    );
  }
  await commandgetListOfReminders(ctx);
});

bot.command('eliminar', async (ctx) => {
  if (!ctx.session.password.isPasswordCorrect) {
    return await ctx.reply(
      'Introduce la contraseña mediante el comando /password para desbloquear el bot'
    );
  }
  await commandDeleteReminder(ctx);
});

bot.command('nuevaubicacion', async (ctx) => {
  if (!ctx.session.password.isPasswordCorrect) {
    return await ctx.reply(
      'Introduce la contraseña mediante el comando /password para desbloquear el bot'
    );
  }
  await commandNewLocation(ctx);
});

bot.command('prevision', async (ctx) => {
  if (!ctx.session.password.isPasswordCorrect) {
    return await ctx.reply(
      'Introduce la contraseña mediante el comando /password para desbloquear el bot'
    );
  }
  await onGetForecast(ctx);
});

bot.on('message:location', async (ctx) => {
  if (!ctx.session.password.isPasswordCorrect) {
    return await ctx.reply(
      'Introduce la contraseña mediante el comando /password para desbloquear el bot'
    );
  }
  await onGetLocation(ctx);
});

bot.on('message:text', async (ctx) => {
  if (!ctx.session.password.isPasswordCorrect) {
    return await ctx.reply(
      'Introduce la contraseña mediante el comando /password para desbloquear el bot'
    );
  }
  await onCheckForTextMessages(ctx);
});

// TODO: at the moment @joserrabot is not allowed for groups
bot.on(':new_chat_members', async (ctx) => {
  if (!ctx.session.password.isPasswordCorrect) {
    return await ctx.reply(
      'Introduce la contraseña mediante el comando /password para desbloquear el bot'
    );
  }
  await onGetUserGrettings(ctx);
});

// Long Polling vs Webhooks (https://grammy.dev/guide/deployment-types.html#long-polling-vs-webhooks)
// Uncomment to develop environment
// bot.start().catch((err) => console.log(err));

const handleUpdate = webhookCallback(bot);
module.exports = async (request: VercelRequest, response: VercelResponse): Promise<any> => {
  try {
    const { body } = request;

    response.status(200).json({ statusCode: 200, body: '' });
    return await handleUpdate(JSON.parse(body)).catch((err: any) => console.log(err));
  } catch (err) {
    console.log(err);

    response
      .status(400)
      .json({ statusCode: 400, body: 'This endpoint is meant for bot and telegram communication' });
  }
};
