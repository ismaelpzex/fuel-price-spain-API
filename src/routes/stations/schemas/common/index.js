const serverError = require("./server-error");
const badRequest = require("./bad-request");

const fp = require("fastify-plugin");

module.exports = fp(async function(fastify, opts) {
  fastify.addSchema(serverError);
  fastify.addSchema(badRequest);
});