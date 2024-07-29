/**
 * Recursively transforms the keys of an object or array.
 *
 * - Replaces spaces with hyphens.
 * - Replaces "%-" with "porcentaje-".
 * - Converts keys to lowercase.
 * - Normalizes keys to remove diacritical marks.
 * - Special case: "longitud-(wgs84)" is transformed to "longitud".
 *
 * @param {Object|Array} data - The data object or array to transform.
 * @returns {Object|Array} - The transformed data with modified keys.
 */

const transformKeys = (data) => {
  if (data === null || typeof data !== "object") {
    return data;
  }

  const transformedObject = Array.isArray(data) ? [] : {};

  for (const [key, value] of Object.entries(data)) {
    let modifiedKey = key.replace(/\s+/g, "-").replace("%-", "porcentaje-").toLowerCase();
    if (modifiedKey === "longitud-(wgs84)") {
      modifiedKey = "longitud";
    }
    const normalizedKey = modifiedKey.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    transformedObject[normalizedKey] = transformKeys(value);
  }

  return transformedObject;
};

module.exports = transformKeys;
