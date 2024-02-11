import mongoose from "mongoose";

const hookSchema = new mongoose.Schema(
  {
    temp: {
      type: String,
    },
  },
  { timestamps: true }
);

const FbWebhook =
  mongoose.models.webhooks || mongoose.model("webhooks", hookSchema);
export default FbWebhook;
