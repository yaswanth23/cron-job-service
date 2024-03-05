import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateWebhookDto } from "../../models/dto/webhook/webhook.dto";
import { IdGeneratorService } from "../idGenerator/idgenerator.service";
import { WebhookSchema } from "../../models/schema/webhook.schema";
import { STATUS_CODES } from "../../constants";

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  constructor(
    @InjectModel("webhook")
    private webhookModel: Model<typeof WebhookSchema>,
    private idGeneratorService: IdGeneratorService
  ) {}

  async createWebhook(createWebhookDto: CreateWebhookDto) {
    try {
      this.logger.log("inside create webhook");
      const webhookId = this.idGeneratorService.generateId();

      await this.webhookModel.create({
        webhookId,
        data: createWebhookDto.data,
        createdAt: createWebhookDto.createdAt,
      });

      return {
        statusCode: STATUS_CODES.STATUS_CODE_201,
        message: "Webhook data stored successfully.",
        data: { webhookId },
      };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async getAllWebhooks() {
    try {
      this.logger.log("inside  get all webhooks");
      const webhooks = await this.webhookModel
        .find({}, { _id: 0, __v: 0 })
        .exec();

      return {
        statusCode: STATUS_CODES.STATUS_CODE_200,
        message: "success",
        data: webhooks,
      };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
