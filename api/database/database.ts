import { connect } from 'mongoose';
import * as dotenv from 'dotenv';
import Reminder from './models/Reminder';

dotenv.config();

const dbURI = `${process.env.MONGO_URI}`;

(async () => {
  try {
    const db = await connect(dbURI);
    console.log(`DB connected to ${db.connection.name}`);
  } catch (err) {
    console.log(err);
  }
})()
  .then()
  .catch((err) => console.log(err));

export const insertReminderIntoDatabase = async (
  userName: string | undefined,
  botUserId: number | undefined,
  reminderName: string | undefined,
  reminderValue: string | undefined,
  isActive = true
): Promise<void> => {
  const newReminder = new Reminder({
    userName,
    botUserId,
    reminderName,
    reminderValue,
    isActive: true,
  });
  await newReminder.save();
};
