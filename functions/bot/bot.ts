import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';

import { actionStart, actionHelp } from './actions/actions';

dotenv.config();

const token: string = process.env.BOT_TOKEN ?? '';
const bot = new Telegraf(token);

// Basic commands
bot.start(async (ctx) => await actionStart(ctx, bot).catch((err) => console.log(err)));
bot.help(async (ctx) => await actionHelp(ctx, bot).catch((err) => console.log(err)));

bot.on('sticker', async (ctx) => {
  await ctx.reply('💪');
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
