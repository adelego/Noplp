export default {
  handler: "functions/authenticate/handler.main",
  events: [
    {
      httpApi: {
        method: "get",
        path: "/login",
        cors: {
          allowedOrigins: "*",
          allowedHeaders: ["Content-Type", "Authorization", "Origin"],
          allowedMethods: ["GET", "OPTIONS"],
          allowCredentials: true,
        },
      },
    },
  ],
  iamRoleStatements: [
    {
      Effect: "Allow",
      Resource: {
        "Fn::Sub":
          "arn:aws:ssm:${opt:region, self:provider.region}:*:parameter/noplp-${opt:stage, self:provider.stage}-genius-*",
      },

      Action: ["ssm:GetParameter"],
    },
  ],
  iamRoleStatementsInherit: true,
};
