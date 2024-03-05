import { Test, TestingModule } from "@nestjs/testing";
import { WebhookController } from "./webhook.controller";
import { WebhookService } from "../../services/webhook/webhook.service";
import { ThrottlerModule } from "@nestjs/throttler";
import { STATUS_CODES } from "../../constants";

describe("WebhookController", () => {
  let controller: WebhookController;
  let service: WebhookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebhookController],
      providers: [
        {
          provide: WebhookService,
          useValue: {
            createWebhook: jest.fn(),
            getAllWebhooks: jest.fn(),
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

    controller = module.get<WebhookController>(WebhookController);
    service = module.get<WebhookService>(WebhookService);
  });

  describe("createWebhook", () => {
    it("should create a webhook and return 201 status code", async () => {
      const createWebhookDto = {
        data: "Test webhook data",
        createdAt: new Date().toISOString(),
      };
      const webhookId = 1;
      const expectedResponse = {
        statusCode: STATUS_CODES.STATUS_CODE_201,
        message: "Webhook data stored successfully.",
        data: { webhookId },
      };
      jest.spyOn(service, "createWebhook").mockResolvedValue(expectedResponse);

      const response = await controller.createWebhook(createWebhookDto);
      expect(response).toEqual(expectedResponse);
    });
  });

  describe("getAllWebhooks", () => {
    it("should return all webhooks", async () => {
      const mockWebhooks = [
        {
          webhookId: "420237300821102600",
          data: {
            cronJobId: "420237140380586000",
          },
          createdAt: "2024-03-05T15:12:21.898Z",
        },
      ];
      const expectedResponse = {
        statusCode: STATUS_CODES.STATUS_CODE_200,
        message: "success",
        data: [],
      };
      jest.spyOn(service, "getAllWebhooks").mockResolvedValue(expectedResponse);

      const response = await controller.getAllWebhooks();
      expect(response).toEqual(expectedResponse);
    });
  });
});
