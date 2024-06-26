import { Context, SessionFlavor } from 'grammy';
import { ConversationFlavor } from '@grammyjs/conversations';

export interface SessionGrammy {
  location?:
    | {
        latitude: number;
        longitude: number;
        city: string;
        country: string;
        icon: string;
        temp: number;
      }
    | undefined;
  password: {
    value: string | undefined;
    isPasswordCorrect: boolean;
  };
}

export type ContextGrammy = Context & SessionFlavor<SessionGrammy>;
export type ConversationContext = Context & ConversationFlavor;
export type MyConversation = Conversation<ConversationContext>;

interface ApiWeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Weather[];
  main: Main;
  sys: SystemData;
  name: string;
  cod: string;
  message: string;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface SystemData {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

interface ApiForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherList[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

interface WeatherList {
  [index: number]: unknown;
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: Weather[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  rain: {
    '3h': number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface MessageResponse {
  message: {
    message_id: number;
    from: MessageFrom;
    chat: {
      id: number;
      first_name: string;
      last_name: string;
      username: string;
      type: string;
    };
    date: number;
    text: string;
    entities: unknown;
  };
  update: {
    update_id: string;
    message: {
      message_id: string;
      from: MessageFrom;
      chat: unknown;
      date: string;
      location: {
        latitude: number;
        longitude: number;
      };
      text?: string;
    };
  };
}

interface MessageFrom {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
}

interface Stop {
  id: number;
  name: string;
  city: string;
  city_id: string;
  latitude: number;
  longitude: number;
  order: number;
}

interface Line {
  id: string;
  name: string;
  route: number;
  synoptic: string;
  direction: number;
  headsign: string;
  city: string;
  city_id: number;
  hours: string[];
  comments: string[];
}

interface ApiBusLineResponse {
  [index: number]: LineResponse;
}

interface LineResponse {
  id: string;
  name: string;
  route: string;
  synoptic: string;
  service: number;
  headsign: string;
  direction: number;
  stops: Stop[];
}

interface ApiBusLatLongResponse {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  distance: number;
  lines: Line[];
}
