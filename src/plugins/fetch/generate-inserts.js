/**
 * Generates an SQL INSERT statement for a given dataset.
 *
 * This function takes an array of objects (data) and generates an SQL INSERT statement
 * to insert the data into a table named 'stations'. It transforms the keys of the objects
 * by replacing "c.p." with "cp" and hyphens with underscores. It also ensures that string
 * values are properly escaped to prevent SQL injection.
 *
 * @param {Array<Object>} data - An array of objects representing the data to be inserted.
 * Each object should have the same keys.
 * @returns {Promise<string>} A promise that resolves to the generated SQL INSERT statement.
 * @throws {Error} Throws an error if there is an issue generating the insert statement.
 *
 * @example
 * const data = [
 *   { "c.p.-name": "Station1", "c.p.-location": "Location1", "value": 123 },
 *   { "c.p.-name": "Station2", "c.p.-location": "Location2", "value": 456 }
 * ];
 *
 * generateInsertStatement(data)
 *   .then((statement) => console.log(statement))
 *   .catch((error) => console.error(error));
 *
 * // Output:
 * // INSERT INTO stations ("cp_name", "cp_location", "value")
 * // VALUES ('Station1', 'Location1', 123), ('Station2', 'Location2', 456)
 */

module.exports = async (data) => {
  try {
    const originalKeys = Object.keys(data[0]);
    const transformedKeys = originalKeys.map((key) => key.replace("c.p.", "cp").replace(/-/g, "_"));
    const values = data.map((item) =>
      Object.values(item).map((value, index) => {
        const key = originalKeys[index];
        if (key === "latitud" || key === "longitud") {
          return Number(value.replace(",", "."));
        }
        return value;
      })
    );
    const insertStatement = `
      INSERT INTO stations (${transformedKeys.map((key) => `"${key}"`).join(", ")})
      VALUES ${values
        .map((value) => `(${value.map((v) => (typeof v === "string" ? `'${v.replace(/'/g, "''")}'` : v)).join(", ")})`)
        .join(", ")}
    `;

    return insertStatement;
  } catch (error) {
    throw new Error(`Error generating insert statements: ${error.message}`);
  }
};
