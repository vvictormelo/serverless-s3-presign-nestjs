import { Injectable } from "@nestjs/common";
import AWS from "aws-sdk";

@Injectable()
export class S3Service {
  private s3 = new AWS.S3({ signatureVersion: "v4" });

  async presignUpload(params: { bucket: string; key: string; contentType: string; expiresSec?: number }) {
    const { bucket, key, contentType, expiresSec = 120 } = params;

    const uploadUrl = await this.s3.getSignedUrlPromise("putObject", {
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
      Expires: expiresSec,
    });

    return { uploadUrl };
  }
}
