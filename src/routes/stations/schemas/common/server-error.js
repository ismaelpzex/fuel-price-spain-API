module.exports = {
    $id: "server-error",
    type: "object",
    properties: {
      message: {
        type: "string",
        description: "the error message"
      },
      error: {
        type: "string",
        description: "the error type"
      }
    },
    required: ["message"]
  };