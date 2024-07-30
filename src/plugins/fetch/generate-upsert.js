/**
 * Generates an SQL UPSERT statement for a given dataset.
 *
 * This function takes an array of objects (data) and generates an SQL UPSERT statement
 * to insert the data into a table named 'stations'. It transforms the keys of the objects
 * by replacing "c.p." with "cp" and hyphens with underscores. It also ensures that string
 * values are properly escaped to prevent SQL injection. If there is a conflict on the 'ideess'
 * column, it updates the existing row with the new values.
 *
 * @param {Array<Object>} data - An array of objects representing the data to be inserted.
 * Each object should have the same keys.
 * @returns {Promise<string>} A promise that resolves to the generated SQL UPSERT statement.
 * @throws {Error} Throws an error if there is an issue generating the upsert statement.
 *
 * @example
 * const data = [
 *   { "c.p.-name": "Station1", "c.p.-location": "Location1", "value": 123, "ideess": "1" },
 *   { "c.p.-name": "Station2", "c.p.-location": "Location2", "value": 456, "ideess": "2" }
 * ];
 *
 * generateUpsertStatement(data)
 *   .then((statement) => console.log(statement))
 *   .catch((error) => console.error(error));
 *
 * // Output:
 * // INSERT INTO stations ("cp_name", "cp_location", "value", "ideess")
 * // VALUES ('Station1', 'Location1', 123, '1'), ('Station2', 'Location2', 456, '2')
 * // ON CONFLICT (ideess) DO UPDATE SET
 * // "cp_name" = EXCLUDED."cp_name", "cp_location" = EXCLUDED."cp_location", "value" = EXCLUDED."value"
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
      INSERT INTO stations (${transformedKeys.map((key) => `"${key}"`).join(", ")}, "last_update")
      VALUES ${values
        .map(
          (value) =>
            `(${value.map((v) => (typeof v === "string" ? `'${v.replace(/'/g, "''")}'` : v)).join(", ")}, NULL)`
        )
        .join(", ")}
      ON CONFLICT (ideess) DO UPDATE SET
      ${transformedKeys
        .filter((key) => key !== "ideess")
        .map((key) => `"${key}" = EXCLUDED."${key}"`)
        .join(", ")},
      "last_update" = NOW()
    `;

    return insertStatement;
  } catch (error) {
    throw new Error(`Error generating upsert statements: ${error.message}`);
  }
};