import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CronService } from "../../services/cron/cron.service";
import { CreateCronJobDto } from "../../models/dto/cron/cron.dto";

@ApiTags("Cron APIs")
@Controller("api/v1/cron-job")
export class CronController {
  constructor(private readonly cronService: CronService) {}

  @Post()
  async createCronJob(@Body() createCronJobDto: CreateCronJobDto) {
    return this.cronService.createCronJob(createCronJobDto);
  }
}
