//Handlers
const { getNearestGasStations, getGasStationById } = require("./handlers");

//Schemas
const { getNearesGasStationsSchema, getGasStationByIdSchema } = require("./schemas");

module.exports = async function (fastify, opts) {
  fastify.route({
    method: "GET",
    url: "/nearest-gas-stations",
    schema: {
      summary: "Get the nearest gas stations",
      description:
        "This endpoint allows obtaining the nearest gas stations to a specific location. The location is determined by the query parameters lat (latitude) and lon (longitude). Additionally, an optional distance parameter can be specified to limit the search radius in kilometers. The default value for distance is 5 kilometers.",
      tags: ["stations"],
      ...getNearesGasStationsSchema
    },
    handler: getNearestGasStations
  });

  fastify.route({
    method: "GET",
    url: "/:id",
    schema: {
      summary: "Get station by ID",
      description: "This endpoint allows obtaining the details of a specific gas station by its unique identifier. The gas station is determined by the path parameter id. The id should be a valid UUID.",
      tags: ["stations"],
      ...getGasStationByIdSchema
    },
    handler: getGasStationById
  })
};
