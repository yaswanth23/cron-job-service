import { Injectable, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  CreateCronJobDto,
  UpdateCronJobDto,
} from "../../models/dto/cron/cron.dto";
import { IdGeneratorService } from "../idGenerator/idgenerator.service";
import { STATUS_CODES, SCHEDULE_TYPES } from "../../constants";
import { CronJobSchema } from "src/models/schema/cron.schema";
import { CronJob } from "cron";

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(
    @InjectModel("cronJob")
    private cronJobModel: Model<typeof CronJobSchema>,
    private idGeneratorService: IdGeneratorService
  ) {}

  async createCronJob(createCronJobDto: CreateCronJobDto) {
    try {
      const jobId = this.idGeneratorService.generateId();

      this.logger.log(`Creating cron job with ID: ${jobId}`);

      const startDate = new Date(createCronJobDto.startDate);
      const currentDate = new Date();

      if (this.isSameDay(startDate, currentDate)) {
        let cronExpression = this.getCronExpression(createCronJobDto.schedule);
        this.scheduleCronJob(jobId.toString(), cronExpression);
      } else if (startDate < currentDate) {
        throw new HttpException(
          "Start date must be in the future",
          HttpStatus.BAD_REQUEST
        );
      }

      await this.cronJobModel.create({
        jobId: jobId.toString(),
        jobName: createCronJobDto.jobName,
        triggerLink: createCronJobDto.triggerLink,
        apiKey: createCronJobDto.apiKey,
        schedule: createCronJobDto.schedule,
        startDate: createCronJobDto.startDate,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      return {
        statusCode: STATUS_CODES.STATUS_CODE_201,
        message: "cron job created successfully.",
        data: { jobId: jobId },
      };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async getAllCronJobs() {
    try {
      this.logger.log("inside  get all jobs");
      const cronJobs = await this.cronJobModel
        .find(
          {},
          {
            _id: 0,
            jobId: 1,
            jobName: 1,
            triggerLink: 1,
            apiKey: 1,
            schedule: 1,
            startDate: 1,
          }
        )
        .exec();

      return {
        statusCode: STATUS_CODES.STATUS_CODE_200,
        message: "success",
        data: cronJobs,
      };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async updateCronJob(jobId: string, updateCronJobDto: UpdateCronJobDto) {
    try {
      this.logger.log(`inside  update job ${jobId}`);
      const existingCronJob = await this.cronJobModel
        .findOne({ jobId: jobId })
        .exec();

      if (!existingCronJob) {
        throw new HttpException("Cron job not found", HttpStatus.NOT_FOUND);
      }

      const updatedFields: Partial<UpdateCronJobDto> = {};

      if (updateCronJobDto.jobName) {
        updatedFields.jobName = updateCronJobDto.jobName;
      }
      if (updateCronJobDto.triggerLink) {
        updatedFields.triggerLink = updateCronJobDto.triggerLink;
      }
      if (updateCronJobDto.apiKey) {
        updatedFields.apiKey = updateCronJobDto.apiKey;
      }
      if (updateCronJobDto.schedule) {
        updatedFields.schedule = updateCronJobDto.schedule;
      }
      if (updateCronJobDto.startDate) {
        const startDate = new Date(updateCronJobDto.startDate);
        const currentDate = new Date();

        if (startDate < currentDate) {
          throw new HttpException(
            "Start date must be in the future",
            HttpStatus.BAD_REQUEST
          );
        }

        updatedFields.startDate = updateCronJobDto.startDate;
      }

      await this.cronJobModel.updateOne({ jobId: jobId }, updatedFields).exec();

      return {
        statusCode: STATUS_CODES.STATUS_CODE_200,
        message: "Cron job updated successfully",
        data: { jobId },
      };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async deleteCronJob(jobId: string) {
    try {
      this.logger.log(`inside  delete job ${jobId}`);
      const deletedJob = await this.cronJobModel
        .deleteOne({ jobId: jobId })
        .exec();

      if (deletedJob.deletedCount === 0) {
        throw new HttpException("Cron job not found", HttpStatus.NOT_FOUND);
      }

      return {
        statusCode: STATUS_CODES.STATUS_CODE_200,
        message: "Cron job deleted successfully",
      };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  private scheduleCronJob(jobId: string, cronExpression: string) {
    const cronJob = new CronJob(
      cronExpression,
      () => {
        this.logger.log(`Cron job with ID: ${jobId} is running.`);
      },
      null,
      true,
      "UTC"
    );
    cronJob.start();
  }

  private getCronExpression(schedule: string) {
    switch (schedule) {
      case SCHEDULE_TYPES.daily:
        return "0 0 * * *"; // Daily at midnight
      case SCHEDULE_TYPES.weekly:
        return "0 0 * * 1"; // Weekly on Monday at midnight
      case SCHEDULE_TYPES.monthly:
        return "0 0 1 * *"; // Monthly on the 1st day of the month at midnight
      case SCHEDULE_TYPES.hourly:
        return "0 * * * *"; // Hourly at the 0th minute of every hour
      case SCHEDULE_TYPES.everyMinute:
        return "* * * * *"; // Every minute
      default:
        throw new Error("Invalid schedule type");
    }
  }
}
