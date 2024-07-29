//const envalid = require("envalid");

// const env = envalid.cleanEnv(process.env, {
//   // Default the target service internal URL to the default port that
//   // is used in the `docker-compose.yml`.
//   //
//   // If you change such configuration, you will need to explicitly
//   // pass this value when you run the tests via NPM CLI:
//   //
//   //     TEST_URL=http://localhost:xxx npm run test:e2e
//   //
//   TEST_URL: envalid.url({
//     desc: "Service base url",
//     default: "http://localhost:4046"
//   })
// });

// Export the defaulted test TEST_URL to the global process so that the
// testing facilities offered by `@forrestjs/service-fastify` can use it
// and make simple calls to the service itself.
const env = {};
process.env.TEST_URL = env.TEST_URL;

module.exports = () => ({...env});