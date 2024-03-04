import { Injectable, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateCronJobDto } from "../../models/dto/cron/cron.dto";
import { IdGeneratorService } from "../idGenerator/idgenerator.service";
import { STATUS_CODES } from "../../constants";
import { CronJobSchema } from "src/models/schema/cron.schema";

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

      await this.cronJobModel.create({
        jobId: jobId,
        jobName: createCronJobDto.jobName,
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
}
