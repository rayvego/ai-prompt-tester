import { Schema, model, models } from "mongoose";

// Define the schema for the Community
const cultureBotCommunitySchema = new Schema(
  {
    // * Trust Pool
    trustPoolName: {
      type: String,
      required: true,
    },
    trustPool: {
      type: Schema.Types.ObjectId,
      ref: "TrustPools",
      required: true,
    },
    // * Culture Book
    cultureBook: {
      type: Schema.Types.ObjectId,
      ref: "CultureBook",
    },
    // * General Info
    communityName: {
      // name of the telegram group
      type: String,
      required: true,
    },
    chatId: {
      type: String,
      required: true,
    },
    initiator: {
      // the user who entered the community in the telegram bot
      type: String,
      required: true,
    },
    initiatorTgId: {
      type: String,
      required: true,
    },
    isWatching: {
      type: Boolean,
      default: true,
    },
    // ? Remove the below 3 fields?
    privateKey: {
      type: String,
    },
    publicKey: {
      type: String,
    },
    balance: {
      type: Number,
      default: 0,
    },
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "CultureBotMessage",
      },
    ],
  },
  { timestamps: true }
);

const CultureBotCommunity =
  models.CultureBotCommunity || model("CultureBotCommunity", cultureBotCommunitySchema);
  
export default CultureBotCommunity;