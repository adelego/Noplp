import { CloudFormationResources, Serverless, Tags } from "serverless/aws";
import Authenticate from "./functions/authenticate/config";
const defaultTags: Tags = {
  project: "noplp",
};

const Resources: CloudFormationResources = {};

const serverlessConfiguration: Serverless = {
  service: `noplp-back`,
  frameworkVersion: ">=1.72.0",
  plugins: ["serverless-webpack", "serverless-iam-roles-per-function"],
  provider: {
    name: "aws",
    runtime: "nodejs12.x",
    region: "eu-west-1",
    profile: "noplp",
    environment: { AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1" },
    tags: defaultTags,
  },
  functions: {
    Authenticate,
  },
  custom: {
    webpack: {
      packager: "yarn",
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  resources: {
    // @ts-ignore error in serverless/aws types
    Description: "NOPLP Frontend",
    Resources,
  },
};

module.exports = serverlessConfiguration;
