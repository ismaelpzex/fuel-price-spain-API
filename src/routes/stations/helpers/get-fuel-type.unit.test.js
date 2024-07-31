const getFuelType = require("./get-fuel-type");

describe("getFuelType", () => {
  it("Should return an error if the fuel type is provided", () => {
    const fuelType = null;
    expect(() => getFuelType(fuelType)).toThrow("Fuel types must be an array");
  });

  it("Should return an array of fuel prices", () => {
    const fuelType = ["gas-natural-comprimido"];
    const result = getFuelType(fuelType);

    expect(result).toEqual(["precio_gas_natural_comprimido"]);
  });

  it("Should return an array", () => {
    const fuelType = ["gas-natural-comprimido", "gasolina-95-e10"];
    const result = getFuelType(fuelType);

    expect(Array.isArray(result)).toBeTruthy();
  });

  it("Should return an error if the fuel type is not provided", () => {
    const fuelType = [];
    expect(() => getFuelType(fuelType)).toThrow("Fuel types are required");
  });

  it("Should return an error if the fuel type is not valid", () => {
    const fuelType = ["test"];
    expect(() => getFuelType(fuelType)).toThrow("The type of fuel is not covered");
  });

  it("Should return only valid fuel types from a mixed array", () => {
    const fuelType = ["gas-natural-comprimido", "invalid-fuel"];
    const result = getFuelType(fuelType);
    expect(result).toEqual(["precio_gas_natural_comprimido"]);
  });

  it("Should return an error if no valid fuel types are found in a mixed array", () => {
    const fuelType = ["invalid-fuel1", "invalid-fuel2"];
    expect(() => getFuelType(fuelType)).toThrow("The type of fuel is not covered");
  });

  it("Should handle duplicate fuel types correctly", () => {
    const fuelType = ["gas-natural-comprimido", "gas-natural-comprimido"];
    const result = getFuelType(fuelType);
    expect(result).toEqual(["precio_gas_natural_comprimido"]);
  });

  it("Should not be case-sensitive and return a valid fuel types", () => {
    const fuelType = ["GAS-NATURAL-COMPRIMIDO"];
    const result = getFuelType(fuelType);
    expect(result).toEqual(["precio_gas_natural_comprimido"]);
  });

   it("Should return an error if the array contains non-string values", () => {
     const fuelType = ["gas-natural-comprimido", 123];
     expect(() => getFuelType(fuelType)).toThrow("Fuel types must be strings");
   });

   it("Should return a valid fuel type if the array contains stings with accents and upper case", () => {
     const fuelType = ["Gás-Natural-Comprimido"];
     const result = getFuelType(fuelType);
     expect(result).toEqual(["precio_gas_natural_comprimido"]);
   });
});
