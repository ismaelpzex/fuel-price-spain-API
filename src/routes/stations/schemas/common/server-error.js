module.exports = {
    $id: "server-error",
    type: "object",
    properties: {
      message: {
        type: "string",
        description: "the error message"
      },
      extensions: {
        type: "array",
        items: {
          type: "object"
        },
        description: "additional information about the error"
      }
    },
    required: ["message"]
  };