import { Test, TestingModule } from "@nestjs/testing";
import { CronController } from "./cron.controller";
import { CronService } from "../../services/cron/cron.service";
import { ThrottlerModule } from "@nestjs/throttler";
import { STATUS_CODES } from "../../constants";

describe("CronController", () => {
  let controller: CronController;
  let service: CronService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CronController],
      providers: [
        {
          provide: CronService,
          useValue: {
            createCronJob: jest.fn(),
            getAllCronJobs: jest.fn(),
            updateCronJob: jest.fn(),
            deleteCronJob: jest.fn(),
          },
        },
      ],
      imports: [
        ThrottlerModule.forRoot([
          {
            ttl: 60,
            limit: 10,
          },
        ]),
      ],
    }).compile();

    controller = module.get<CronController>(CronController);
    service = module.get<CronService>(CronService);
  });

  describe("createCronJob", () => {
    it("should return 201 status code", async () => {
      const createCronJobDto = {
        jobName: "test job",
        triggerLink: "http://localhost:9000/api/v1/webhook",
        apiKey: "your_api_key_here",
        schedule: "WEEKLY",
        startDate: "2024-03-05T00:00:00Z",
      };

      const mockJobId = Math.floor(Math.random() * 1000);

      const expectedResponse = {
        statusCode: STATUS_CODES.STATUS_CODE_201,
        message: "cron job created successfully.",
        data: { jobId: mockJobId },
      };

      jest.spyOn(service, "createCronJob").mockResolvedValue(expectedResponse);

      const response = await controller.createCronJob(createCronJobDto);
      expect(response).toEqual(expectedResponse);
    });
  });

  describe("getAllCronJobs", () => {
    it("should return all cron jobs", async () => {
      const mockCronJobs = [
        {
          jobId: "1",
          jobName: "Test Job 1",
          triggerLink: "http://example.com/job1",
          apiKey: "apiKey1",
          schedule: "DAILY",
          startDate: "2023-01-01T00:00:00Z",
        },
        {
          jobId: "2",
          jobName: "Test Job 2",
          triggerLink: "http://example.com/job2",
          apiKey: "apiKey2",
          schedule: "WEEKLY",
          startDate: "2023-01-08T00:00:00Z",
        },
      ];

      jest.spyOn(service, "getAllCronJobs").mockResolvedValue({
        statusCode: STATUS_CODES.STATUS_CODE_200,
        message: "success",
        data: [],
      });

      const response = await controller.getAllCronJobs();

      const expectedResponse = {
        statusCode: STATUS_CODES.STATUS_CODE_200,
        message: "success",
        data: [],
      };

      expect(response).toEqual(expectedResponse);
    });
  });

  describe("updateCronJob", () => {
    it("should update a cron job and return 200 status code", async () => {
      const jobId = "1";
      const updateCronJobDto = {
        jobName: "my Job 2",
        triggerLink: "http://example.com/trigger",
        apiKey: "your_api_key_here",
        schedule: "WEEKLY",
        startDate: "2024-03-07T00:00:00Z",
      };

      const expectedResponse = {
        statusCode: STATUS_CODES.STATUS_CODE_200,
        message: "Cron job updated successfully",
        data: { jobId },
      };

      jest.spyOn(service, "updateCronJob").mockResolvedValue(expectedResponse);

      const response = await controller.updateCronJob(jobId, updateCronJobDto);

      expect(response).toEqual(expectedResponse);
      expect(service.updateCronJob).toHaveBeenCalledWith(
        jobId,
        updateCronJobDto
      );
    });
  });

  describe("deleteCronJob", () => {
    it("should delete a cron job and return 200 status code", async () => {
      const jobId = "1";

      const expectedResponse = {
        statusCode: STATUS_CODES.STATUS_CODE_200,
        message: "Cron job deleted successfully",
      };

      jest.spyOn(service, "deleteCronJob").mockResolvedValue(expectedResponse);

      const response = await controller.deleteCronJob(jobId);

      expect(response).toEqual(expectedResponse);
      expect(service.deleteCronJob).toHaveBeenCalledWith(jobId);
    });
  });
});
