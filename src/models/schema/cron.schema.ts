import { SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type CronJobDocument = Document;

export const CronJobSchema = new mongoose.Schema({
  jobId: BigInt,
  jobName: String,
  triggerLink: String,
  apiKey: String,
  schedule: String,
  startDate: Date,
  createdAt: Date,
  updatedAt: Date,
});

export const CronJobModel = mongoose.model("cronJob", CronJobSchema);

export const CronJobModelSchema = SchemaFactory.createForClass(CronJobModel);
