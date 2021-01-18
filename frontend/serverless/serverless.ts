import { CloudFormationResources, Serverless, Tags } from "serverless/aws";

import { FrontendBuildBucket, FrontendBuildBucketPolicy } from "./resources/s3";

const defaultTags: Tags = {
  project: "noplp",
};

const Resources: CloudFormationResources = {
  FrontendBuildBucket,
  FrontendBuildBucketPolicy,
};

const serverlessConfiguration: Serverless = {
  service: `noplp`,
  frameworkVersion: ">=1.72.0",
  plugins: ["serverless-s3-sync"],
  provider: {
    name: "aws",
    runtime: "nodejs12.x",
    region: "eu-west-1",
    profile: "noplp",
    environment: { AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1" },
    tags: defaultTags,
  },
  custom: {
    s3BuildBucketName: "noplp/frontend/build-bucket",
    s3Sync: [
      { bucketNameKey: "frontendBuildBucketName", localDir: "../build" },
    ],
  },
  resources: {
    // @ts-ignore error in serverless/aws types
    Description: "NOPLP Frontend",
    Resources,
    Outputs: {
      frontendBuildBucketName: {
        Value: {
          Ref: "FrontendBuildBucket",
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
