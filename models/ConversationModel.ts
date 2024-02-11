import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
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
    updated_time: {
      type: String,
    },
  },
  { timestamps: true }
);

const Conversation =
  mongoose.models.conversations ||
  mongoose.model("conversations", conversationSchema);
export default Conversation;
