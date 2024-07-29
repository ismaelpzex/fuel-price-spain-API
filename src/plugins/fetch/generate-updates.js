/**
 * Generates SQL UPDATE statements for the given data.
 *
 * @param {Array<Object>} data - The array of data objects to generate update statements for.
 * @returns {Promise<string>} - A promise that resolves to a string containing the SQL UPDATE statements.
 * @throws {Error} - Throws an error if there is an issue generating the update statements.
 */

module.exports = async (data) => {
  try {
    const originalKeys = Object.keys(data[0]);
    const transformedKeys = originalKeys.map((key) => key.replace("c.p.", "cp").replace(/-/g, "_"));
    const keyMap = originalKeys.reduce((map, key, index) => {
      map[key] = transformedKeys[index];
      return map;
    }, {});

    const updateStatements = data
      .map((item) => {
        const setClause = originalKeys
          .map(
            (key) =>
              `"${keyMap[key]}" = ${typeof item[key] === "string" ? `'${item[key].replace(/'/g, "''")}'` : item[key]}`
          )
          .join(", ");
        return `UPDATE stations SET ${setClause} WHERE ideess = '${item.ideess}';`;
      })
      .join("\n");

    return updateStatements;
  } catch (error) {
    throw new Error(`Error generating update statements: ${error.message}`);
  }
};
