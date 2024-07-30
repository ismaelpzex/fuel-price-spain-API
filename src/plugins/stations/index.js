const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
  /**
   * Retrieves the nearest gas stations based on the provided latitude and longitude coordinates.
   *
   * @param {number} lat - The latitude coordinate.
   * @param {number} lon - The longitude coordinate.
   * @param {number} [distance=5000] - The maximum distance (in meters) within which to search for gas stations. Defaults to 5000 meters.
   * @returns {Promise<Array>} - A promise that resolves to an array of gas station objects.
   */
  const getNearestGasStations = async ({lon, lat, distance = 5000}) => {
    const query = `
        SELECT *
        FROM stations
        WHERE ST_DWithin(
            ST_SetSRID(ST_MakePoint(longitud, latitud), 4326)::geography,
            ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography,
            $3
        );
    `;

    const {rows} = await fastify.pg.query(query, [lon, lat, distance]);
    return rows;
  };

  fastify.decorate("stations", {getNearestGasStations});
});
