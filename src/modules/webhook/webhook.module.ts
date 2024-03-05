import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { WebhookController } from "../../controllers/webhook/webhook.controller";
import { WebhookService } from "../../services/webhook/webhook.service";
import { IdGeneratorService } from "../../services/idGenerator/idgenerator.service";
import { WebhookSchema } from "../../models/schema/webhook.schema";

@Module({
  controllers: [WebhookController],
  providers: [WebhookService, IdGeneratorService],
  imports: [
    MongooseModule.forFeature([{ name: "webhook", schema: WebhookSchema }]),
  ],
})
export class WebhookModule {}
