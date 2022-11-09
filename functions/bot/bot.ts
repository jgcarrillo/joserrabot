import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';

import { actionStart, actionHelp } from './actions/actions';
import { getBirthdays, getBus, getInvitationLink, getWeatherMessage } from './commands/commands';
import { getDefaultMessage, getUserGreeting } from './on/on';

dotenv.config();

const token: string = process.env.BOT_TOKEN ?? '';
const bot = new Telegraf(token);

bot.start(async (ctx) => await actionStart(ctx, bot).catch((err) => console.log(err)));
bot.help(async (ctx) => await actionHelp(ctx, bot).catch((err) => console.log(err)));

bot.command('bus', async (ctx) => {
  await getBus(ctx);
});

bot.command('tiempo', async (ctx) => {
  await getWeatherMessage(ctx, bot);
});

bot.command('birth', async (ctx) => {
  await getBirthdays(ctx, bot);
});

bot.command('invite', (ctx) => {
  getInvitationLink(ctx).catch((err) => console.log(err));
});

bot.on('new_chat_members', async (ctx) => {
  await getUserGreeting(ctx);
});

bot.on('message', async (ctx) => {
  await getDefaultMessage(ctx, bot);
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
