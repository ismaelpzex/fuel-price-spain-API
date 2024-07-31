const {build} = require("../../helper");
const insertGasStations = require("./helpers/insert-gas-stations");

describe("GET /stations/fuel-type/:fuel-type", () => {
  let app;
  const baseUrl = "api/v1/stations/fuel-type";

  beforeAll(async () => {
    app = await build();
  });

  beforeEach(async () => {
    await app.pg.query("TRUNCATE TABLE stations CASCADE");
  });

  afterAll(async () => {
    await app.close();
  });

  it("should return 400 if the fuel type does not exist", async () => {
    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}/qwertyuiop`
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty(
      "message",
      'params/fuelType must match pattern "^(biodiesel|bioetanol|gas-natural-comprimido|gas-natural-licuado|gases-licuados-del-petroleo|gasoleo-a|gasoleo-b|gasoleo-premium|gasolina-95-e10|gasolina-95-e5|gasolina-95-e5-premium|gasolina-98-e10|gasolina-98-e5|hidrogeno)(,(biodiesel|bioetanol|gas-natural-comprimido|gas-natural-licuado|gases-licuados-del-petroleo|gasoleo-a|gasoleo-b|gasoleo-premium|gasolina-95-e10|gasolina-95-e5|gasolina-95-e5-premium|gasolina-98-e10|gasolina-98-e5|hidrogeno))*$"'
    );
    expect(response.json()).toHaveProperty("error", "Bad Request");
    expect(response.json()).toHaveProperty("code", "FST_ERR_VALIDATION");
  });

  it("Should return 400 if the fuel type is not a string", async () => {
    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}/123`
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty(
      "message",
      'params/fuelType must match pattern "^(biodiesel|bioetanol|gas-natural-comprimido|gas-natural-licuado|gases-licuados-del-petroleo|gasoleo-a|gasoleo-b|gasoleo-premium|gasolina-95-e10|gasolina-95-e5|gasolina-95-e5-premium|gasolina-98-e10|gasolina-98-e5|hidrogeno)(,(biodiesel|bioetanol|gas-natural-comprimido|gas-natural-licuado|gases-licuados-del-petroleo|gasoleo-a|gasoleo-b|gasoleo-premium|gasolina-95-e10|gasolina-95-e5|gasolina-95-e5-premium|gasolina-98-e10|gasolina-98-e5|hidrogeno))*$"'
    );
    expect(response.json()).toHaveProperty("error", "Bad Request");
    expect(response.json()).toHaveProperty("code", "FST_ERR_VALIDATION");
  });

  it("should return 404 if the station does not exist", async () => {
    await insertGasStations(app);

      const response = await app.inject({
        method: "GET",
        url: `${baseUrl}/hidrogeno`
      });

    expect(response.statusCode).toBe(404);
    expect(response.json()).toHaveProperty("message", "Station not found");
    expect(response.json()).toHaveProperty("error", "Not Found");
  });

  it("should return the station by fuel type", async () => {
    await insertGasStations(app);

    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}/gasoleo-a`
    });

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.json())).toBeTruthy();
    expect(response.json()).toHaveLength(12);
  });

  it("should return stations by multiple fuel types", async () => {
    await insertGasStations(app);

    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}/gasoleo-a,gasolina-95-e5`
    });

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.json())).toBeTruthy();
    expect(response.json()).toHaveLength(9);
  });

  it("should return 400 if the fuel type contains spaces", async () => {
    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}/gasoleo a`
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty(
      "message",
      'params/fuelType must match pattern "^(biodiesel|bioetanol|gas-natural-comprimido|gas-natural-licuado|gases-licuados-del-petroleo|gasoleo-a|gasoleo-b|gasoleo-premium|gasolina-95-e10|gasolina-95-e5|gasolina-95-e5-premium|gasolina-98-e10|gasolina-98-e5|hidrogeno)(,(biodiesel|bioetanol|gas-natural-comprimido|gas-natural-licuado|gases-licuados-del-petroleo|gasoleo-a|gasoleo-b|gasoleo-premium|gasolina-95-e10|gasolina-95-e5|gasolina-95-e5-premium|gasolina-98-e10|gasolina-98-e5|hidrogeno))*$"'
    );
    expect(response.json()).toHaveProperty("error", "Bad Request");
    expect(response.json()).toHaveProperty("code", "FST_ERR_VALIDATION");
  });

  it("should return 400 if the fuel type is empty", async () => {
    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}/`
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty(
      "message",
      'params/fuelType must match pattern "^(biodiesel|bioetanol|gas-natural-comprimido|gas-natural-licuado|gases-licuados-del-petroleo|gasoleo-a|gasoleo-b|gasoleo-premium|gasolina-95-e10|gasolina-95-e5|gasolina-95-e5-premium|gasolina-98-e10|gasolina-98-e5|hidrogeno)(,(biodiesel|bioetanol|gas-natural-comprimido|gas-natural-licuado|gases-licuados-del-petroleo|gasoleo-a|gasoleo-b|gasoleo-premium|gasolina-95-e10|gasolina-95-e5|gasolina-95-e5-premium|gasolina-98-e10|gasolina-98-e5|hidrogeno))*$"'
    );
    expect(response.json()).toHaveProperty("error", "Bad Request");
    expect(response.json()).toHaveProperty("code", "FST_ERR_VALIDATION");
  });
});
