const getDataFromSot = require("./get-data-from-sot");
const transformKeys = require("./transform-keys");
const generateInserts = require("./generate-inserts");
const generateUpdates = require("./generate-updates");
const fp = require("fastify-plugin");
const cron = require("node-cron");

const DATA_URL =
  "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/";
const CRON_SCHEDULE = "0 */12 * * *";
const TIMEZONE = "Europe/Madrid";

module.exports = fp(async (fastify, opts) => {
  const refresh = async () => {
    fastify.log.info("Fetching data...");
    const response = await fastify.pg.query("SELECT * FROM stations");
    const dataFromSot = await getDataFromSot(DATA_URL);
    const transformedData = transformKeys(dataFromSot.ListaEESSPrecio);
    const query =
      response.rows.length > 0 ? await generateUpdates(transformedData) : await generateInserts(transformedData);
    try {
      await fastify.pg.query(query);
      fastify.log.info("Data fetched successfully");
    } catch (error) {
      fastify.log.error(`Error fetching data: ${error.message}`);
    }
  };

  await refresh();
  cron.schedule(
    CRON_SCHEDULE,
    async () => {
      fastify.log.info("Updating data...");
      await refresh();
    },
    {scheduled: true, timezone: TIMEZONE}
  );

  fastify.decorate("fetchData", {refresh});
});
