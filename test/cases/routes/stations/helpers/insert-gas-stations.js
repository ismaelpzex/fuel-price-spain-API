const gasStations = require("../fixtures/gas-stations");

module.exports = async ({pg}) => {
  const keys = Object.keys(gasStations[0]);

  const columns = keys.join(", ");

  const values = gasStations
    .map((station) => {
      const valueArray = keys.map((key) => (station[key] ? `'${station[key]}'` : "NULL"));
      return `(${valueArray.join(", ")})`;
    })
    .join(", ");

  // Generar la consulta completa
  const query = `INSERT INTO stations (${columns}) VALUES ${values};`;

    return await pg.query(query);
}
