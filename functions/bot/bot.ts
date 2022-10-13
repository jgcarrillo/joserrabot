import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';

import { actionStart, actionHelp } from './actions/actions';
import { getInvitationLink } from './commands/commands';
import WeatherService from './services/WeatherService';

dotenv.config();

const token: string = process.env.BOT_TOKEN ?? '';
const bot = new Telegraf(token);

// Basic commands
bot.start(async (ctx) => await actionStart(ctx, bot).catch((err) => console.log(err)));
bot.help(async (ctx) => await actionHelp(ctx, bot).catch((err) => console.log(err)));

bot.on('new_chat_members', (ctx) => {
  console.log(ctx.message.new_chat_members);
});

// Advanced commands
bot.command('invite', (ctx) => {
  getInvitationLink(ctx).catch((err) => console.log(err));
});

bot.command('tiempo', async (ctx) => {
  const weatherService = new WeatherService('Murcia');
  const { data } = await weatherService.getWeather();
  const zone = weatherService.getZone();

  // Check for weather icon
  let icon = '';
  if (data.weather[0].description === 'clear sky') icon = 'soleado ☀';
  if (data.weather[0].description === 'few clouds') icon = 'con algunas nubes ⛅';
  if (data.weather[0].description === 'scattered clouds') icon = 'nublado ☁';
  if (data.weather[0].description === 'broken clouds') icon = 'bastante nublado ☁☁';
  if (data.weather[0].description === 'overcast clouds') icon = 'bastante nublado ☁☁';
  if (data.weather[0].description === 'shower rain') icon = 'empezando a chispear 🌧';
  if (data.weather[0].description === 'rain') icon = 'lluvioso 🌧';
  if (data.weather[0].description === 'thunderstorm') icon = 'con tormentas 🌩';
  if (data.weather[0].description === 'snow') icon = 'nevando ❄';
  if (data.weather[0].description === 'mist') icon = 'con niebla 🌫';

  ctx
    .reply(`La temperatura en ${zone} es de: ${data.main.temp} °C. El tiempo está ${icon}`)
    .catch((err) => console.log(err));
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
