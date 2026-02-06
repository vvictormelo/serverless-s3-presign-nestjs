import serverlessExpress from "@vendia/serverless-express";
import type { Handler } from "aws-lambda";
import { createNestApp } from "./main";

let cachedServer: any;

export const handler: Handler = async (event, context) => {
  if (!cachedServer) {
    const app = await createNestApp();
    const expressApp = app.getHttpAdapter().getInstance();

    cachedServer = serverlessExpress({ app: expressApp });
  }

  return cachedServer(event, context);
};
