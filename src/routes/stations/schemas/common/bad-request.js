module.exports = {
  $id: "bad-request",
  type: "object",
  additionalProperties: false,
  properties: {
    error: {
      type: "string",
      description: "Error type",
      enum: ["Bad Request"]
    },
    code: {
      type: "string",
      description: "Error code"
    },
    message: {
      type: "string",
      description: "Bad request error message"
    }
  },
  required: ["error", "message"]
};