module.exports = {
  params: {
    type: "object",
    properties: {
      province: {
        type: "string",
        minLength: 2,
        pattern: "^[a-zA-ZáéíóúÁÉÍÓÚ]+$"
      }
    },
    required: ["province"]
  },
  response: {
    200: {
      type: "array",
      items: {$ref: "station-response-dto"}
    },
    400: {$ref: "bad-request"},
    404: {$ref: "not-found"},
    500: {$ref: "server-error"}
  }
};
