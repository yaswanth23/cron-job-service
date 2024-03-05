import { Body, Controller, Post, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { WebhookService } from "../../services/webhook/webhook.service";
import { CreateWebhookDto } from "../../models/dto/webhook/webhook.dto";

@ApiTags("Webhook APIs")
@Controller("api/v1/webhook")
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  createWebhook(@Body() createWebhookDto: CreateWebhookDto) {
    return this.webhookService.createWebhook(createWebhookDto);
  }

  @Get()
  async getAllWebhooks() {
    return this.webhookService.getAllWebhooks();
  }
}
