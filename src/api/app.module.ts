import { Module } from "@nestjs/common";
import { UploadsController } from "./uploads.controller";
import { S3Service } from "./s3.service";

@Module({
  controllers: [UploadsController],
  providers: [S3Service],
})
export class AppModule {}
