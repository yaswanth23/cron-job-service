import { Document } from "mongoose";

export interface CronJobType extends Document {
  jobId: string;
  jobName: string;
  triggerLink: string;
  apiKey: string;
  schedule: string;
  startDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
