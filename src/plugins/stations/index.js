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

  const getStationById = async (id) => {
    const query = `
        SELECT *
        FROM stations
        WHERE id = $1;
    `;

    const {rows} = await fastify.pg.query(query, [id]);
    return rows[0];
  };

  const getStationsByLocation = async (location) => {
    const query = `
      SELECT *
      FROM stations
      WHERE unaccent(lower(localidad)) = unaccent(lower($1));
    `;

    const {rows} = await fastify.pg.query(query, [location]);
    return rows;
  };

  const getStationsByMunicipality = async (municipality) => {
    const query = `
      SELECT *
      FROM stations
      WHERE unaccent(lower(municipio)) = unaccent(lower($1));
    `;

    const {rows} = await fastify.pg.query(query, [municipality]);
    return rows;
  };

  const getStationsByProvince = async (province) => {
    const query = `
      SELECT *
      FROM stations
      WHERE unaccent(lower(provincia)) = unaccent(lower($1));
    `;

    const {rows} = await fastify.pg.query(query, [province]);
    return rows;
  };

  const getStationsByFuelType = async (fuelTypes) => {

    const conditionals = fuelTypes.reduce((acc, curr, index) => {
      const condition = `${curr} != ''`;
      return index === 0 ? `WHERE ${condition}` : `${acc} AND ${condition}`;
    }, "");

    const query = `
    SELECT *
    FROM stations
    ${conditionals};
  `;

    const {rows} = await fastify.pg.query(query);
    return rows;
  };

  fastify.decorate("stations", {
    getNearestGasStations,
    getStationById,
    getStationsByLocation,
    getStationsByMunicipality,
    getStationsByProvince,
    getStationsByFuelType
  });
});
