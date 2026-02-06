import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

export async function createNestApp() {
  const app = await NestFactory.create(AppModule, { logger: ["log", "error", "warn"] });
  app.enableCors();
  await app.init();
  return app;
}
