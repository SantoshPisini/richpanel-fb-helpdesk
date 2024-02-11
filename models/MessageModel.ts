import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    agent_id: {
      type: String,
    },
    integration_id: {
      type: String,
    },
    conversation_id: {
      type: String,
    },
    message_id: {
      type: String,
    },
    message: {
      type: String,
    },
    message_to_name: {
      type: String,
    },
    message_from_email: {
      type: String,
    },
    message_to_id: {
      type: String,
    },
    message_from_name: {
      type: String,
    },
    message_from_id: {
      type: String,
    },
    created_time: {
      type: String,
    },
  },
  { timestamps: true }
);

const Message =
  mongoose.models.messages || mongoose.model("messages", messageSchema);
export default Message;
