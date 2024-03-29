import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getPing(): any {
    return {
      server_time: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      server_name: "cron-job-service-api",
      version: "1.0",
    };
  }
}
