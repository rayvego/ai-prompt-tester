import mongoose from "mongoose";
import "@/models/CultureBotMessage";
import "@/models/CultureBotCommunity";
import "@/models/CultureBook"
import { logger } from "./logger";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

async function connectToDatabase() {
  // Check if we have a connection to the database or if it's already connected
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      // These options help with connection stability
      bufferCommands: false,
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });

    logger.info("Connected to database");
    return conn.connection;
  } catch (error) {
    logger.error(`Failed to connect to database: ${error}`);
    throw error;
  }
}

export default connectToDatabase;
