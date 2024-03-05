import mongoose, { Schema, Document } from "mongoose";

export type CronJobHistoryDocument = Document & {
  cronJobId: string;
  response: any;
  triggeredAt: Date;
};

export const CronJobHistorySchema = new Schema({
  cronJobId: {
    type: String,
    required: true,
  },
  response: Schema.Types.Mixed,
  triggeredAt: {
    type: Date,
    default: Date.now,
  },
});

export const CronJobHistoryModel = mongoose.model<CronJobHistoryDocument>(
  "cronJobHistory",
  CronJobHistorySchema
);
