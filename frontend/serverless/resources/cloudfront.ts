import * as AwsConfig from "serverless/aws";

export const NoplpFrontendCloudFront: AwsConfig.CloudFormationResource = {
  Type: "AWS::CloudFront::Distribution",
  Properties: {
    DistributionConfig: {
      Origins: [
        {
          DomainName: {
            "Fn::Join": [
              "",
              [
                {
                  Ref: "FrontendBuildBucket",
                },
                ".s3.amazonaws.com",
              ],
            ],
          },
          Id: "NoplpWebApp",
          CustomOriginConfig: {
            HTTPPort: 80,
            HTTPSPort: 443,
            OriginProtocolPolicy: "https-only",
          },
        },
      ],
      Enabled: true,
      DefaultRootObject: "index.html",
      CustomErrorResponses: [
        {
          ErrorCode: 404,
          ResponseCode: 200,
          ResponsePagePath: "/index.html",
        },
      ],
      DefaultCacheBehavior: {
        AllowedMethods: [
          "DELETE",
          "GET",
          "HEAD",
          "OPTIONS",
          "PATCH",
          "POST",
          "PUT",
        ],
        TargetOriginId: "NoplpWebApp",
        ForwardedValues: {
          QueryString: "false",
          Cookies: { Forward: "none" },
        },
        ViewerProtocolPolicy: "redirect-to-https",
      },
      ViewerCertificate: { CloudFrontDefaultCertificate: "true" },
    },
  },
};
