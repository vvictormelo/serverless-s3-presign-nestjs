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

  async getJsonObject(bucket: string, key: string) {
    try {
      const obj = await this.s3.getObject({ Bucket: bucket, Key: key }).promise();
      const body = obj.Body?.toString("utf-8") || "";
      
      return JSON.parse(body);
      
    } catch (err: any) {
      
      if (err?.code === "NoSuchKey") {
        return { status: "not_found", key, message: "Result not found yet (or invalid key)." };
      }
      throw err;
    }
  }


}
