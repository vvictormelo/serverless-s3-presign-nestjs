import AWS from "aws-sdk";
import { analyzeBuffer } from "./analyze";

// Cliente do S3 pra ler/escrever objetos
const s3 = new AWS.S3();

export const main = async (event: any) => {
  const bucket = process.env.UPLOAD_BUCKET;
  if (!bucket) throw new Error("UPLOAD_BUCKET not set");

  for (const record of event.Records || []) {

    const key = decodeURIComponent(record.s3.object.key.replace(/\+/g, " "));


    if (!key.startsWith("uploads/")) continue;

    const obj = await s3.getObject({ Bucket: bucket, Key: key }).promise();
    const buf = obj.Body as Buffer;

    const analysis = analyzeBuffer(key, buf);

    const resultKey = `results/${key.replace(/^uploads\//, "")}.json`;

    const payload = {
      input: { bucket, key },
      analyzedAt: new Date().toISOString(),
      analysis
    };


    await s3
      .putObject({
        Bucket: bucket,
        Key: resultKey,
        Body: JSON.stringify(payload, null, 2),
        ContentType: "application/json"
      })
      .promise();

    console.log("Processed:", { key, resultKey });
  }

  return { ok: true };
};
