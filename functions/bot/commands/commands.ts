import { Context, Markup, Composer, Scenes } from 'telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';
import { reminderMessage, weatherMessage } from '../data/variables';
import BusService from '../services/BusService';
import { checkForMessage } from '../on/on';
import { BotContext, MessageResponse } from '../types/types';
import { insertReminderIntoDatabase } from '../database/database';

export const getInvitationLink = async (ctx: Context): Promise<Message.TextMessage> => {
  const context = ctx as typeof ctx & { message: string };

  if (context.message.chat.type === 'private') {
    return await ctx.reply('ℹ Necesitas estar en un grupo para crear un link de invitación ℹ');
  }

  const res = await ctx.telegram.createChatInviteLink(context.message.chat.id);
  return await ctx.reply(`Aquí tienes tu invitación: ${res.invite_link}`);
};

export const setReminder = async (ctx: Context): Promise<Message.TextMessage> => {
  return await ctx.reply(reminderMessage, { parse_mode: 'Markdown' });
};

export const getWeatherMessage = async (ctx: Context): Promise<Message.TextMessage> => {
  return await ctx.reply(
    weatherMessage,
    Markup.keyboard([Markup.button.locationRequest('Send location')]).resize()
  );
};

export const getBus = async (ctx: Context): Promise<Message.TextMessage | undefined> => {
  const busService = new BusService(undefined, undefined, '44.A.1');

  try {
    const { data } = await busService.getDataByLine();
    return await ctx.reply(`La ruta elegida es: ${data[0].id} - ${data[0].name}`);
  } catch (err) {
    console.log(err);
  }
};

export const getNewLocation = async (ctx: BotContext): Promise<Message.TextMessage | undefined> => {
  // Check for message again because I need to check if '/nuevaubicacion' exists in the message context
  return await checkForMessage(ctx);
};

export const stepHandler = new Composer<BotContext>();
stepHandler.command('crear', async (ctx) => {
  await ctx.reply('¿Qué nombre quieres que le pongamos?');
  ctx.session.reminderName = '';
  ctx.session.reminderValue = '';

  return ctx.wizard.next();
});

export const reminderScene = new Scenes.WizardScene(
  'reminderScene',
  stepHandler,
  async (ctx) => {
    const context = ctx as typeof ctx & MessageResponse;

    if (context.message.text.length < 2) {
      await ctx.reply('Por favor, introduce un nombre correcto');
      return;
    }

    ctx.session.reminderName = context.message.text;
    await ctx.reply('¿Qué contenido quieres que tenga tu recordatorio?');

    return ctx.wizard.next();
  },
  async (ctx) => {
    const context = ctx as typeof ctx & MessageResponse;

    const userId = context.update.message.from.id;
    const userName = context.update.message.from.first_name;

    if (context.message.text.length < 2) {
      await ctx.reply('Por favor, introduce un valor correcto');
      return;
    }

    ctx.session.reminderValue = context.message.text;

    await insertReminderIntoDatabase(
      userName,
      userId,
      context.session.reminderName,
      context.session.reminderValue
    );

    await ctx.reply('¡Recordatorio añadido!');

    return await ctx.scene.leave();
  }
);

export const listReminders = async (ctx: BotContext): Promise<Message.TextMessage | undefined> => {
  const context = ctx as typeof ctx & MessageResponse;
  return await context.reply('Listado de los recordatorios para el usuario');
};

export const deleteReminder = async (ctx: BotContext): Promise<Message.TextMessage | undefined> => {
  const context = ctx as typeof ctx & MessageResponse;
  return await context.reply('Eliminar alguno de los siguientes recordatorios');
};
