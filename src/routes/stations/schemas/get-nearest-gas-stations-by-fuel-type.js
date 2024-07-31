const allowedFuelTypes = [
  "biodiesel",
  "bioetanol",
  "gas-natural-comprimido",
  "gas-natural-licuado",
  "gases-licuados-del-petroleo",
  "gasoleo-a",
  "gasoleo-b",
  "gasoleo-premium",
  "gasolina-95-e10",
  "gasolina-95-e5",
  "gasolina-95-e5-premium",
  "gasolina-98-e10",
  "gasolina-98-e5",
  "hidrogeno"
];

const fuelTypePattern = allowedFuelTypes.join("|");

module.exports = {
  querystring: {
    type: "object",
    properties: {
      lat: {type: "number"},
      lon: {type: "number"},
      distance: {
        type: "number",
        minimum: 10,
        maximum: 20000
      },
      fuelType: {
        type: "string",
        pattern: `^(${fuelTypePattern})(,(${fuelTypePattern}))*$`,
        description: `Fuel type(s) to filter by. Allowed values are: ${allowedFuelTypes.join(
          ", "
        )}. Multiple values can be separated by commas.`
      }
    },
    required: ["lat", "lon", "fuelType"]
    // Asegurarse de que fuelType sea requerido
  },
  response: {
    // 200: {
    //   type: "array",
    //   items: {
    //     $ref: "station-response-dto"
    //   }
    // },
    400: {$ref: "bad-request"},
    404: {$ref: "not-found"},
    500: {$ref: "server-error"}
  }
};
