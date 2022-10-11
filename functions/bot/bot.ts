import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';

dotenv.config();

const token: string = process.env.BOT_TOKEN ?? '';
const bot = new Telegraf(token);

const welcomeMessage = `Welcome!
I'm Joserrabot
Send me some links to store them`;

// Basic commands
bot.start((ctx) => {
  ctx.reply(welcomeMessage);
});
bot.help((ctx) => {
  ctx.reply('This is the help');
});

bot.launch();

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
