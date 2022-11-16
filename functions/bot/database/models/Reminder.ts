import { Schema, model } from 'mongoose';

interface ReminderData {
  botUserId: number;
  userName: string;
  reminderName: string;
  reminderValue: string;
  isActive: boolean;
}

const ReminderSchema = new Schema<ReminderData>({
  botUserId: {
    type: Number,
    required: true,
    unique: false,
    trim: true,
  },
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  reminderName: {
    type: String,
    required: true,
    trim: true,
  },
  reminderValue: {
    type: String,
    required: true,
    trim: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    unique: false,
    trim: false,
  },
});

export default model('Reminder', ReminderSchema);
