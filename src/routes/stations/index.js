//Handlers
const { getNearestGasStations } = require("./handlers");

//Schemas
const { getNearesGasStationsSchema } = require("./schemas");

module.exports = async function (fastify, opts) {
  fastify.route({
    method: "GET",
    url: "/nearest-gas-stations",
    schema: {
      sumary: "Get the nearest gas stations",
      description:
        "This endpoint allows obtaining the nearest gas stations to a specific location. The location is determined by the query parameters lat (latitude) and lon (longitude). Additionally, an optional distance parameter can be specified to limit the search radius in kilometers. The default value for distance is 5 kilometers.",
      tags: ["stations"],
      ...getNearesGasStationsSchema
    },
    handler: getNearestGasStations
    
  });
};
