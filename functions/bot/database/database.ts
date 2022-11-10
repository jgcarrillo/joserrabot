import { connect } from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const dbURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.wei3mn3.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

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
