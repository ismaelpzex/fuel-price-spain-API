module.exports = {
  $id: "not-found",
  type: "object",
  additionalProperties: false,
  properties: {
    error: {
      type: "string",
      description: "Error type",
      enum: ["Not Found"]
    },
    message: {
      type: "string",
      description: "Bad request error message"
    }
  },
  required: ["error", "message"]
};