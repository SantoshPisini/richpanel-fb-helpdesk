import mongoose from "mongoose";

const agentSchema = new mongoose.Schema(
  {
    agent_id: {
      type: String,
    },
    user_id: {
      type: String,
    },
    page_id: {
      type: String,
    },
    page_name: {
      type: String,
    },
    page_access_token: {
      type: String,
    },
    refresh_token: {
      type: String,
    },
    data_access_expiration_time: {
      type: String,
    },
  },
  { timestamps: true }
);

const Integration =
  mongoose.models.integrations || mongoose.model("integrations", agentSchema);
export default Integration;
