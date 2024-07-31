const {build} = require("../../helper");
const insertGasStations = require("./helpers/insert-gas-stations");

describe("GET /stations/nearest-gas-stations", () => {
  let app;
  const baseUrl = "api/v1/stations/get-nearly-gas-stations-by-fuel-type";

  beforeAll(async () => {
    app = await build();
  });

  beforeEach(async () => {
    await app.pg.query("TRUNCATE TABLE stations CASCADE");
  });

  afterAll(async () => {
    await app.close();
  });

  it("should return 400 if lat is not provided", async () => {
    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}?lon=-3.70256&fuelType=gasoleo-a`
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty("error", "Bad Request");
    expect(response.json()).toHaveProperty("message", "querystring must have required property 'lat'");
    expect(response.json()).toHaveProperty("code", "FST_ERR_VALIDATION");
  });

  it("should return 400 if lon is not provided", async () => {
    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}?lat=40.4165&fuelType=gasoleo-a`
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty("error", "Bad Request");
    expect(response.json()).toHaveProperty("message", "querystring must have required property 'lon'");
  });

  it("should return 400 if fuelType is not provided", async () => {
    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}?lat=40.4165&lon=-3.70256`
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty("error", "Bad Request");
    expect(response.json()).toHaveProperty("message", "querystring must have required property 'fuelType'");
  });

  it("should return 400 if lat is not a number", async () => {
    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}?lat=foo&lon=-3.70256&fuelType=gasoleo-a`
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty("error", "Bad Request");
    expect(response.json()).toHaveProperty("message", "querystring/lat must be number");
  });

  it("should return 400 if lon is not a number", async () => {
    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}?lat=40.4165&lon=foo&fuelType=gasoleo-a`
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty("error", "Bad Request");
    expect(response.json()).toHaveProperty("message", "querystring/lon must be number");
  });

  it("should return 400 if fuelType is not a string", async () => {
    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}?lat=40.4165&lon=-3.70256&fuelType=foo`
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty("error", "Bad Request");
    expect(response.json()).toHaveProperty(
      "message",
      'querystring/fuelType must match pattern "^(biodiesel|bioetanol|gas-natural-comprimido|gas-natural-licuado|gases-licuados-del-petroleo|gasoleo-a|gasoleo-b|gasoleo-premium|gasolina-95-e10|gasolina-95-e5|gasolina-95-e5-premium|gasolina-98-e10|gasolina-98-e5|hidrogeno)(,(biodiesel|bioetanol|gas-natural-comprimido|gas-natural-licuado|gases-licuados-del-petroleo|gasoleo-a|gasoleo-b|gasoleo-premium|gasolina-95-e10|gasolina-95-e5|gasolina-95-e5-premium|gasolina-98-e10|gasolina-98-e5|hidrogeno))*$"'
    );
  });

  it("Should return 400 if fuelType is not a valid fuel type", async () => {
    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}?lat=40.4165&lon=-3.70256&fuelType=foo`
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty("error", "Bad Request");
    expect(response.json()).toHaveProperty(
      "message",
      'querystring/fuelType must match pattern "^(biodiesel|bioetanol|gas-natural-comprimido|gas-natural-licuado|gases-licuados-del-petroleo|gasoleo-a|gasoleo-b|gasoleo-premium|gasolina-95-e10|gasolina-95-e5|gasolina-95-e5-premium|gasolina-98-e10|gasolina-98-e5|hidrogeno)(,(biodiesel|bioetanol|gas-natural-comprimido|gas-natural-licuado|gases-licuados-del-petroleo|gasoleo-a|gasoleo-b|gasoleo-premium|gasolina-95-e10|gasolina-95-e5|gasolina-95-e5-premium|gasolina-98-e10|gasolina-98-e5|hidrogeno))*$"'
    );
  });

  it("should return 400 if distance is not a number", async () => {
    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}?lat=40.4165&lon=-3.70256&fuelType=gasoleo-a&distance=foo`
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty("error", "Bad Request");
    expect(response.json()).toHaveProperty("message", "querystring/distance must be number");
  });

  it("should return 400 if distance is less than 10", async () => {
    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}?lat=40.4165&lon=-3.70256&fuelType=gasoleo-a&distance=5`
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty("error", "Bad Request");
    expect(response.json()).toHaveProperty("message", "querystring/distance must be >= 10");
  });

  it("should return 400 if distance is more than 20000", async () => {
    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}?lat=40.4165&lon=-3.70256&fuelType=gasoleo-a&distance=20001`
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty("error", "Bad Request");
    expect(response.json()).toHaveProperty("message", "querystring/distance must be <= 20000");
  });

  it("should return 404 if no stations are found", async () => {
    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}?lat=40.4165&lon=-3.70256&fuelType=gasoleo-a`
    });

    expect(response.statusCode).toBe(404);
    expect(response.json()).toHaveProperty("error", "Not Found");
    expect(response.json()).toHaveProperty("message", "Station not found");
  });

  it("should return 200 if stations are found", async () => {
    await insertGasStations(app);

    const expectedOuput = {
      id: "6e9c7cce-25bf-45b3-aea1-c5abf8f48e9a",
      ideess: "5786"
    };


    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}?lon=-3.8020353&lat=37.773808&distance=1000&fuelType=gasoleo-a`
    });

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.json())).toBe(true);
    expect(response.json()).toHaveLength(1);
    expect(response.json()[0]).toHaveProperty("id", expectedOuput.id);
    expect(response.json()[0]).toHaveProperty("ideess", expectedOuput.ideess);
  });

    it("should return 200 if stations are found with various fuel types", async () => {
        await insertGasStations(app);

        const expectedOutput = {
            id: "6e9c7cce-25bf-45b3-aea1-c5abf8f48e9a",
            ideess: "5786"
        };

        const response = await app.inject({
            method: "GET",
            url: `${baseUrl}?lon=-3.8020353&lat=37.773808&distance=1000&fuelType=gasoleo-a,gasolina-95-e10`
        });

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.json())).toBe(true);
        expect(response.json()).toHaveLength(1);
        expect(response.json()[0]).toHaveProperty("id", expectedOutput.id);
        expect(response.json()[0]).toHaveProperty("ideess", expectedOutput.ideess);
    });
});
