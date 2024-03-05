import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
} from "@nestjs/common";
import { Throttle, ThrottlerGuard } from "@nestjs/throttler";
import { ApiTags } from "@nestjs/swagger";
import { CronService } from "../../services/cron/cron.service";
import {
  CreateCronJobDto,
  UpdateCronJobDto,
} from "../../models/dto/cron/cron.dto";

@ApiTags("Cron APIs")
@Controller("api/v1/cron-job")
@UseGuards(ThrottlerGuard)
export class CronController {
  constructor(private readonly cronService: CronService) {}

  @Throttle({ default: { limit: 3, ttl: 5000 } })
  @Post()
  async createCronJob(@Body() createCronJobDto: CreateCronJobDto) {
    return this.cronService.createCronJob(createCronJobDto);
  }

  @Throttle({ default: { limit: 3, ttl: 5000 } })
  @Get()
  async getAllCronJobs() {
    return this.cronService.getAllCronJobs();
  }

  @Throttle({ default: { limit: 3, ttl: 5000 } })
  @Put(":id")
  async updateCronJob(
    @Param("id") id: string,
    @Body() updateCronJobDto: UpdateCronJobDto
  ) {
    return this.cronService.updateCronJob(id, updateCronJobDto);
  }

  @Throttle({ default: { limit: 3, ttl: 5000 } })
  @Delete(":id")
  async deleteCronJob(@Param("id") id: string) {
    return this.cronService.deleteCronJob(id);
  }
}
