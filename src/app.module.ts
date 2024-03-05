import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoggingInterceptor } from "./middleware/logging.interceptor";
import { JsonHeaderInterceptor } from "./middleware/jsonHeader.interceptor";
import { CronModule } from "./modules/cron/cron.module";
import { WebhookModule } from "./modules/webhook/webhook.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    CronModule,
    WebhookModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: JsonHeaderInterceptor,
    },
  ],
})
export class AppModule {}
