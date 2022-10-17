import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';

import { actionStart, actionHelp } from './actions/actions';
import { getBirthdays, getBus, getInvitationLink, getWeather } from './commands/commands';
import { getUserGreeting } from './on';

dotenv.config();

const token: string = process.env.BOT_TOKEN ?? '';
const bot = new Telegraf(token);

/****************
 * Basic commands
 ***************/
bot.start(async (ctx) => await actionStart(ctx, bot).catch((err) => console.log(err)));
bot.help(async (ctx) => await actionHelp(ctx, bot).catch((err) => console.log(err)));

/*******************
 * Advanced commands
 ******************/
bot.command('autobus', async (ctx) => {
  await getBus(ctx);
});

bot.command('tiempo', async (ctx) => {
  await getWeather(ctx);
});

bot.command('birth', async (ctx) => {
  await getBirthdays(ctx, bot);
});

/*********************
 * Management commands
 ********************/
bot.command('invite', (ctx) => {
  getInvitationLink(ctx).catch((err) => console.log(err));
});

/*******************
 * Internal commands
 ******************/
bot.on('new_chat_members', async (ctx) => {
  await getUserGreeting(ctx);
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
