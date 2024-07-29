const path = require("node:path");

const Fastify = require("fastify");
const fp = require("fastify-plugin");
const AppPath = path.join(__dirname, "../..", "src/app.js");

const App = require(AppPath);

function config() {
  return {};
}

async function build() {
  const app = Fastify();

  void app.register(fp(App), App.options);
  await app.ready();

  return app;
}

async function unitBuild(plugins, opts) {
  const app = Fastify();
  plugins.forEach((plugin) => {
    app.register(plugin, { ...opts });
  });

  await app.register(require("@fastify/postgres"), App.options.postgres);

  await app.ready();

  return app;
}

module.exports = {
  config,
  build,
  unitBuild
};
