export default {
  type: "object",
  properties: {
    queryStringParameters: {
      type: "object",
      properties: { userCode: { type: "string" } },
      required: ["userCode"],
      additionalProperties: false,
    },
    context: {
      type: "object",
      properties: { stage: { type: "string" } },
    },
  },
} as const;
