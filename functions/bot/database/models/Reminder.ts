import { Schema, model } from 'mongoose';

interface ReminderData {
  id: string;
  name: string;
  user: string;
  reminder: string;
  isActive: boolean;
}

const ReminderSchema = new Schema<ReminderData>({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  reminder: {
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
