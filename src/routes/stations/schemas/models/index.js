const stationResponseDto = require("./stations-response-dto");

const fp = require("fastify-plugin");

module.exports = fp(async function(fastify, opts) {
  fastify.addSchema(stationResponseDto);
});