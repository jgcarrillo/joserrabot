import { Telegraf, session } from 'telegraf';
import './database/database';
import * as dotenv from 'dotenv';

import { actionStart, actionHelp } from './actions/actions';
import {
  getBus,
  getInvitationLink,
  getNewLocation,
  getWeatherMessage,
  setReminder,
} from './commands/commands';
import { checkForMessage, getLocation, getUserGreeting } from './on/on';
import { BotContext } from './types/types';
import { getForecast } from './hears/hears';

dotenv.config();

if (process.env.BOT_TOKEN === undefined) {
  throw new TypeError('BOT_TOKEN must be provided!');
}

const token: string = process.env.BOT_TOKEN;
const bot = new Telegraf<BotContext>(token);

// Sessions are deprecated and probably in a future won't work (https://github.com/telegraf/telegraf/issues/1372)
bot.use(session());

bot.start(async (ctx) => await actionStart(ctx).catch((err) => console.log(err)));
bot.help(async (ctx) => await actionHelp(ctx).catch((err) => console.log(err)));

bot.command('bus', async (ctx) => {
  await getBus(ctx);
});

bot.command('tiempo', async (ctx) => {
  await getWeatherMessage(ctx);
});

bot.command('recordatorio', async (ctx) => {
  await setReminder(ctx);
});

bot.command('invite', (ctx) => {
  getInvitationLink(ctx).catch((err) => console.log(err));
});

bot.command('nuevaubicacion', async (ctx) => {
  await getNewLocation(ctx);
});

bot.on('new_chat_members', async (ctx) => {
  await getUserGreeting(ctx);
});

bot.on('location', async (ctx) => {
  await getLocation(ctx);
});

bot.hears('/prevision', async (ctx) => {
  await getForecast(ctx);
});

// This function will check for any kind of message
// It MUST BE at the end of the bot file
// It also check if the user send a location
bot.on('message', async (ctx) => {
  await checkForMessage(ctx);
});

bot.launch().catch((err) => console.log(err));

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
