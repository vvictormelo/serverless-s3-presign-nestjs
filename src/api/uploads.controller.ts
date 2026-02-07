import { Body, Controller, Post, Get, Query } from "@nestjs/common";
import { randomUUID } from "crypto";
import { S3Service } from "./s3.service";

type PresignBody = {
  filename: string;
  contentType: string;
};

@Controller()
export class UploadsController {
  constructor(private readonly s3: S3Service) {}

  @Post("/uploads/presign")
  async presign(@Body() body: PresignBody) {
    const bucket = process.env.UPLOAD_BUCKET;
    if (!bucket) throw new Error("UPLOAD_BUCKET not set");

    const safeName = (body.filename || "file").replace(/[^\w.\-]/g, "_");
    const id = randomUUID();
    const key = `uploads/${id}__${safeName}`;

    const { uploadUrl } = await this.s3.presignUpload({
      bucket,
      key,
      contentType: body.contentType || "application/octet-stream",
      expiresSec: 120,
    });

    return { key, uploadUrl };
  }

  @Get("/results")
  async results(@Query("key") key: string) {
    if (!key) {
      return { error: "Missing key query param: key" };
    }
    
    const resultKeys = key.startsWith("uploads/")
      ? `results/${key.replace(/^uploads\//, "")}.json`
      : key.startsWith("results/")
        ? key
        : `results/${key}.json`;

    const bucket = process.env.UPLOAD_BUCKET;
    if (!bucket) throw new Error("UPLOAD_BUCKET not set");

    const data = await this.s3.getJsonObject(bucket, resultKeys);
    return data;


  }
}
