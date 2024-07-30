module.exports = {
  params: {
    type: "object",
    properties: {
      id: {type: "string", format: "uuid"}
    },
    required: ["id"]
  },
  response: {
    200: {$ref: "station-response-dto"},
    400: {$ref: "bad-request"},
    404: {$ref: "not-found"},
    500: {$ref: "server-error"}
  }
};
