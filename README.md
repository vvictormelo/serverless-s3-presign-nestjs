# Serverless Upload Pipeline (AWS + NestJS)

This project implements a secure and scalable file upload pipeline using:

- AWS Lambda
- API Gateway (HTTP API)
- Amazon S3
- NestJS
- Presigned URLs
- Serverless Framework

## Architecture

Client → API Gateway → Lambda (NestJS) → S3 (Presign)
Client → S3 (Direct Upload)

## Features

- Secure upload authorization
- Direct S3 uploads (no backend bottleneck)
- Serverless infrastructure
- IAM-based permissions
- CloudFormation-managed resources

## How it works

1. Client requests a presigned URL
2. API generates a temporary upload URL
3. Client uploads directly to S3
4. File is stored in the uploads/ folder

## Tech Stack

- Node.js 20
- NestJS
- AWS Lambda
- Amazon S3
- Serverless Framework

## Author

Victor Melo
