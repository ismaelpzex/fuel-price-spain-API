const getDataFromSot = require("./get-data-from-sot");
const transformKeys = require("./transform-keys");
const generateUpsert = require("./generate-upsert");
const fp = require("fastify-plugin");
const cron = require("node-cron");

const DATA_URL =
  "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/";
const CRON_SCHEDULE = "0 */12 * * *";
const TIMEZONE = "Europe/Madrid";

module.exports = fp(async (fastify, opts) => {
  const refresh = async () => {
    fastify.log.info("Fetching data...");
    const dataFromSot = await getDataFromSot(DATA_URL);
    const transformedData = transformKeys(dataFromSot.ListaEESSPrecio);
    const query =await generateUpsert(transformedData)
    try {
        await fastify.pg.query(query);
      fastify.log.info("Data fetched successfully");
    } catch (error) {
        console.log(error)
      fastify.log.error(`Error fetching data: ${error.message}`);
    }
  };

  await refresh();
  fastify.log.info("Data will be updated every 12 hours");
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
