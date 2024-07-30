'use strict'

const path = require('node:path')
const AutoLoad = require('@fastify/autoload')

// Pass --options via CLI arguments in command to enable these options.
const options = {}

module.exports = async function (fastify, opts) {
  // Place here your custom code!
  await fastify.register(require("@fastify/postgres"), opts.postgres);
  await fastify.register(require("@fastify/swagger"), opts.swagger);
  await fastify.register(require("@scalar/fastify-api-reference"), opts.scalar);
  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  await fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({prefix: "/api/v1"}, opts)
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  await fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })
}

module.exports.options = require("./options");
