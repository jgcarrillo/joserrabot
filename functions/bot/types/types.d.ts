import { Context } from 'telegraf';

export interface SessionData {
  location:
    | {
        latitude: number;
        longitude: number;
        city: string;
        country: string;
        icon: string;
        temp: number;
      }
    | undefined;
}

export interface BotContext extends Context {
  session: SessionData;
}
