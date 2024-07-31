const fuelTypeStrategies = {
  biodiesel: "precio_biodiesel",
  bioetanol: "precio_bioetanol",
  "gas-natural-comprimido": "precio_gas_natural_comprimido",
  "gas-natural-licuado": "precio_gas_natural_licuado",
  "gases-licuados-del-petroleo": "precio_gases_licuados_del_petroleo",
  "gasoleo-a": "precio_gasoleo_a",
  "gasoleo-b": "precio_gasoleo_b",
  "gasoleo-premium": "precio_gasoleo_premium",
  "gasolina-95-e10": "precio_gasolina_95_e10",
  "gasolina-95-e5": "precio_gasolina_95_e5",
  "gasolina-95-e5-premium": "precio_gasolina_95_e5_premium",
  "gasolina-98-e10": "precio_gasolina_98_e10",
  "gasolina-98-e5": "precio_gasolina_98_e5",
  hidrogeno: "precio_hidrogeno"
};

/**
 * Normalizes and filters an array of fuel types.
 * 
 * @param {string[]} fuelTypes - An array of fuel types to be normalized and filtered.
 * @returns {string[]} - A filtered array of valid, normalized fuel types.
 * @throws {Error} - Throws an error if the input is not an array, if the array is empty, 
 *                   if any element is not a string, or if no valid fuel types are found.
 */
module.exports = (fuelTypes) => {
  if (!Array.isArray(fuelTypes)) throw new Error("Fuel types must be an array");
  if (fuelTypes.length === 0) throw new Error("Fuel types are required");
  if (!fuelTypes.every((fuelType) => typeof fuelType === "string")) throw new Error("Fuel types must be strings");

  const normalizeFuelType = (fuelType) => 
    fuelType
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

const filteredFuelTypes = [
  ...new Set(
    fuelTypes
      .map(normalizeFuelType)
      .filter((fuelType) => Object.keys(fuelTypeStrategies).includes(fuelType))
      .map((fuelType) => fuelTypeStrategies[fuelType])
  )
];

  if (filteredFuelTypes.length === 0) throw new Error("The type of fuel is not covered");

  return filteredFuelTypes;
};