import { Bot, session } from 'grammy';
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
  onGetForecast,
} from './commands/commands';
import { onCheckForTextMessages, onGetLocation, onGetUserGrettings } from './on/on';
import { ContextGrammy, SessionGrammy } from './types/types';

dotenv.config();

if (process.env.BOT_TOKEN === undefined) {
  throw new TypeError('BOT_TOKEN must be provided!');
}

const token: string = process.env.BOT_TOKEN;
const bot = new Bot<ContextGrammy>(token);

const initialSession = (): SessionGrammy => {
  return {
    location: { latitude: 0, longitude: 0, city: '', country: '', icon: '', temp: 0 },
    reminderData: { reminderName: '', reminderValue: '' },
  };
};
bot.use(session({ initial: initialSession }));

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

// import { Telegraf, session } from 'telegraf';
// import './database/database';
// import * as dotenv from 'dotenv';

// import { actionStart, actionHelp } from './actions/actions';
// import {
//   createNewReminder,
//   deleteReminder,
//   getBus,
//   getInvitationLink,
//   getNewLocation,
//   getWeatherMessage,
//   listReminders,
//   setReminder,
// } from './commands/commands';
// import { checkForMessage, getLocation, getUserGreeting } from './on/on';
// import { BotContext } from './types/types';
// import { getForecast } from './hears/hears';

// dotenv.config();

// if (process.env.BOT_TOKEN === undefined) {
//   throw new TypeError('BOT_TOKEN must be provided!');
// }

// const token: string = process.env.BOT_TOKEN;
// const bot = new Telegraf<BotContext>(token);

// // Sessions are deprecated and probably in a future won't work (https://github.com/telegraf/telegraf/issues/1372). It's better to use scenes or wizards (check Telegraf github examples)
// bot.use(session());

// bot.start(async (ctx) => await actionStart(ctx).catch((err) => console.log(err)));
// bot.help(async (ctx) => await actionHelp(ctx).catch((err) => console.log(err)));

// bot.command('bus', async (ctx) => {
//   await getBus(ctx);
// });

// bot.command('tiempo', async (ctx) => {
//   await getWeatherMessage(ctx);
// });

// bot.command('recordatorio', async (ctx) => {
//   await setReminder(ctx);
// });

// bot.command('crear', async (ctx) => {
//   await createNewReminder(ctx);
// });

// bot.command('listar', async (ctx) => {
//   await listReminders(ctx);
// });

// bot.command('eliminar', async (ctx) => {
//   await deleteReminder(ctx);
// });

// bot.command('invite', (ctx) => {
//   getInvitationLink(ctx).catch((err) => console.log(err));
// });

// bot.command('nuevaubicacion', async (ctx) => {
//   await getNewLocation(ctx);
// });

// bot.on('new_chat_members', async (ctx) => {
//   await getUserGreeting(ctx);
// });

// bot.on('location', async (ctx) => {
//   await getLocation(ctx);
// });

// bot.hears('/prevision', async (ctx) => {
//   await getForecast(ctx);
// });

// /*
// bot.action('Name', async (ctx) => {
//   await ctx.answerCbQuery();
//   console.log(ctx.session);
//   await ctx.reply('name name name');
// });
// */

// This function will check for any kind of message
// It MUST BE at the end of the bot file
// It also check if the user send a location
// bot.on('message', async (ctx) => {
//   await checkForMessage(ctx);
// });

// bot.launch().catch((err) => console.log(err));

// /*
// exports.handler = async (event) => {
//   try {
//     await bot.handleUpdate(JSON.parse(event.body));
//     return { statusCode: 200, body: '' };
//   } catch (e) {
//     console.log(e);
//     return { statusCode: 400, body: 'This endpoint is meant for bot and telegram communication' };
//   }
// };
