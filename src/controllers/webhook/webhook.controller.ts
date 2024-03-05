import { Body, Controller, Post, Get, UseGuards } from "@nestjs/common";
import { Throttle, ThrottlerGuard } from "@nestjs/throttler";
import { ApiTags } from "@nestjs/swagger";
import { WebhookService } from "../../services/webhook/webhook.service";
import { CreateWebhookDto } from "../../models/dto/webhook/webhook.dto";

@ApiTags("Webhook APIs")
@Controller("api/v1/webhook")
@UseGuards(ThrottlerGuard)
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Throttle({ default: { limit: 10, ttl: 5000 } })
  @Post()
  createWebhook(@Body() createWebhookDto: CreateWebhookDto) {
    return this.webhookService.createWebhook(createWebhookDto);
  }

  @Throttle({ default: { limit: 3, ttl: 5000 } })
  @Get()
  async getAllWebhooks() {
    return this.webhookService.getAllWebhooks();
  }
}
