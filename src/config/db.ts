import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
  console.log("Hello")
  console.log(process.env.MONGO_URI)
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    console.error('MONGO_URI is not defined in .env file');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURI, {
      // Mongoose v6.x defaults to `useNewUrlParser: true` and `useUnifiedTopology: true`
    });
    console.log('MongoDB connected');
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('Unknown error:', err);
    }
    process.exit(1);
  }
};

export default connectDB;
