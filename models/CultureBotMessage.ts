import { Schema, model, models } from "mongoose";

const cultureBotMessageSchema = new Schema(
  {
    text: {
      type: String,
    },
    senderUsername: {
      type: String,
      required: true,
    },
    senderTgId: {
      type: String,
      required: true,
    },
    messageTgId: {
      type: String,
    },
    transactionHash: {
      type: String,
    },
    ipfsHash: {
      type: String,
    },
    community: {
      type: Schema.Types.ObjectId,
      ref: "CultureBotCommunity",
      required: true,
    },
    hasPhoto: {
      type: Boolean,
      default: false,
    },
    photoUrl: {
      // IPFS Pinata URL
      type: String,
    },
    photoFileId: {
      // Telegram File ID to refetch the image when needed
      type: String,
    },
  },
  { timestamps: true }
);

const CultureBotMessage = models.CultureBotMessage || model("CultureBotMessage", cultureBotMessageSchema);

export default CultureBotMessage;
