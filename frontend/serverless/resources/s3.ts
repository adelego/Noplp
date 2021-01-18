import * as AwsConfig from "serverless/aws";

export const FrontendBuildBucket: AwsConfig.CloudFormationResource = {
  Type: "AWS::S3::Bucket",
  Properties: {
    AccessControl: "PublicRead",
    WebsiteConfiguration: {
      IndexDocument: "index.html",
      ErrorDocument: "index.html",
    },
  },
};

export const FrontendBuildBucketPolicy: AwsConfig.CloudFormationResource = {
  Type: "AWS::S3::BucketPolicy",
  Properties: {
    Bucket: { Ref: "FrontendBuildBucket" },
    PolicyDocument: {
      Statement: [
        {
          Effect: "Allow",
          Principal: "*",
          Resource: {
            "Fn::Join": [
              "",
              [
                "arn:aws:s3:::",
                {
                  Ref: "FrontendBuildBucket",
                },
                "/*",
              ],
            ],
          },
          Action: ["s3:GetObject"],
          Sid: "PublicReadGetObject",
        },
      ],
    },
  },
};
