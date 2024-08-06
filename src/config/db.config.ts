import mongoose from 'mongoose';
import { env } from '../validations/env';

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(env.MONGO_URL);
    console.log(`MongoDB connected : ${connect.connection.host}`);
  } catch (err) {
    console.error(`Mongoose connection error`);

    throw new Error(`Mongoose connection error: ${err}`);
  }
};

export default connectDB;
