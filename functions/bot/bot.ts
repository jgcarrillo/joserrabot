import { Bot, session } from 'grammy';
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
  commandSetReminder,
  commandStart,
  createNewReminder,
  onGetForecast,
} from './commands/commands';
import { onCheckForTextMessages, onGetLocation, onGetUserGrettings } from './on/on';
import { ContextGrammy, ConversationContext, SessionGrammy } from './types/types';
import { conversations, createConversation } from '@grammyjs/conversations';

dotenv.config();

if (process.env.BOT_TOKEN === undefined) {
  throw new TypeError('BOT_TOKEN must be provided!');
}

const token: string = process.env.BOT_TOKEN;
const bot = new Bot<ContextGrammy & ConversationContext>(token);

const initialSession = (): SessionGrammy => {
  return {
    location: { latitude: 0, longitude: 0, city: '', country: '', icon: '', temp: 0 },
    reminderData: { reminderName: '', reminderValue: '' },
  };
};
bot.use(session({ initial: initialSession }));

bot.use(conversations());

bot.use(createConversation(createNewReminder));

bot.command('start', async (ctx) => {
  await commandStart(ctx);
});

bot.command('help', async (ctx) => {
  await commandHelp(ctx);
});

bot.command('bus', async (ctx) => {
  await commandGetBus(ctx);
});

bot.command('invitar', async (ctx) => {
  await commandGetInvitationLink(ctx);
});

bot.command('recordatorio', async (ctx) => {
  await commandSetReminder(ctx);
});

bot.command('tiempo', async (ctx) => {
  await commandGetWeatherMessage(ctx);
});

bot.command('crear', async (ctx) => {
  await ctx.conversation.enter('createNewReminder');
});

bot.command('listar', async (ctx) => {
  await commandgetListOfReminders(ctx);
});

bot.command('eliminar', async (ctx) => {
  await commandDeleteReminder(ctx);
});

bot.command('nuevaubicacion', async (ctx) => {
  await commandNewLocation(ctx);
});

bot.command('prevision', async (ctx) => {
  await onGetForecast(ctx);
});

bot.on('message:location', async (ctx) => {
  await onGetLocation(ctx);
});

bot.on('message:text', async (ctx) => {
  await onCheckForTextMessages(ctx);
});

bot.on(':new_chat_members', async (ctx) => {
  await onGetUserGrettings(ctx);
});

bot.start().catch((err) => console.log(err));

/*
exports.handler = async (event) => {
  try {
    await bot.handleUpdate(JSON.parse(event.body));
    return { statusCode: 200, body: '' };
  } catch (e) {
    console.log(e);
    return { statusCode: 400, body: 'This endpoint is meant for bot and telegram communication' };
  }
};
*/
