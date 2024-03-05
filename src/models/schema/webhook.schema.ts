import mongoose, { Schema, Document } from "mongoose";

export type WebhookDocument = Document & {
  webhookId: string;
  data: any;
  createdAt: Date;
};

export const WebhookSchema = new Schema({
  webhookId: {
    type: String,
    required: true,
    unique: true,
  },
  data: {
    type: Schema.Types.Mixed,
    required: true,
  },
  createdAt: {
    type: Date,
  },
});

export const WebhookModel = mongoose.model<WebhookDocument>(
  "webhook",
  WebhookSchema
);
