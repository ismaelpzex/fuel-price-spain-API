const {getFuelType} = require("../helpers");

const transformFuelTypes = (fuelTypes, reply) => {
  try {
    return getFuelType(fuelTypes);
  } catch (error) {
    reply.code(400);
    return new Error({
      error: "Bad Request",
      message: "Invalid fuel type",
      code: "FUEL_TYPE_ERR_VALIDATION"
    });
  }
};

async function getGasStationsByFuelType(req, reply) {
  const {fuelType, lat, lon, distance} = req.query;
  const fuelTypes = fuelType.split(",");

  const transformedFuelTypes = transformFuelTypes(fuelTypes, reply);

  const response = await this.stations.getNearestGasStationsByFuelType({transformedFuelTypes, lat, lon, distance});

  if (!response || response.length === 0) {
    reply.code(404).send({
      error: "Not Found",
      message: "Station not found"
    });
    return;
  }

  return response;
}

module.exports = getGasStationsByFuelType;
