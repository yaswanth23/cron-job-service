import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CronController } from "../../controllers/cron/cron.controller";
import { CronService } from "../../services/cron/cron.service";
import { IdGeneratorService } from "../../services/idGenerator/idgenerator.service";
import { CronJobSchema } from "src/models/schema/cron.schema";

@Module({
  controllers: [CronController],
  providers: [CronService, IdGeneratorService],
  imports: [
    MongooseModule.forFeature([{ name: "cronJob", schema: CronJobSchema }]),
  ],
})
export class CronModule {}
