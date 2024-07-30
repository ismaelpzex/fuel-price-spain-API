//Handlers
const {getNearestGasStations, getGasStationById, getGasStationsByLocation} = require("./handlers");
const getGasStationsByMunicipality = require("./handlers/get-gas-station-by-municipality");

//Schemas
const {
  getNearesGasStationsSchema,
  getGasStationByIdSchema,
  getGasStationsByLocationSchema,
  getGasStationsByMunicipalitySchema
} = require("./schemas");

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
      description:
        "This endpoint allows obtaining the details of a specific gas station by its unique identifier. The gas station is determined by the path parameter id. The id should be a valid UUID.",
      tags: ["stations"],
      ...getGasStationByIdSchema
    },
    handler: getGasStationById
  });

  fastify.route({
    method: "GET",
    url: "/location/:location",
    schema: {
      summary: "Get station by location",
      description:
        "This endpoint allows obtaining the details of a specific gas station by its location. The gas station is determined by the path parameter location. The location should be a valid string.",
      tags: ["stations"],
      ...getGasStationsByLocationSchema
    },
    handler: getGasStationsByLocation
  });

  fastify.route({
    method: "GET",
    url: "/municipality/:municipality",
    schema: {
      summary: "Get station by municipality",
      description:
        "This endpoint allows obtaining the details of a specific gas station by its municipality. The gas station is determined by the path parameter municipality. The location should be a valid string.",
      tags: ["stations"],
      ...getGasStationsByMunicipalitySchema
    },
    handler: getGasStationsByMunicipality
  });
};
