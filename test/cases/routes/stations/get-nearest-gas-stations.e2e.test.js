const {build} = require("../../helper");
const insertGasStations = require("./helpers/insert-gas-stations");

describe("GET /stations/nearest-gas-stations", () => {
  let app;
  const baseUrl = "api/v1/stations/nearest-gas-stations";

  beforeAll(async () => {
    app = await build();
  });

  beforeEach(async () => {
    await app.pg.query("TRUNCATE TABLE stations CASCADE");
  });

  afterAll(async () => {
    await app.close();
  });

  it("should return 400 if no query parameters are provided", async () => {
    const response = await app.inject({
      method: "GET",
      url: baseUrl
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty("message", "querystring must have required property 'lat'");
    expect(response.json()).toHaveProperty("error", "Bad Request");
    expect(response.json()).toHaveProperty("code", "FST_ERR_VALIDATION");
  });

  it("should return 400 if lat is not a number", async () => {
    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}?lat=abc&lon=123`
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty("message", "querystring/lat must be number");
    expect(response.json()).toHaveProperty("error", "Bad Request");
    expect(response.json()).toHaveProperty("code", "FST_ERR_VALIDATION");
  });

  it("should return 400 if lon is not a number", async () => {
    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}?lat=123&lon=abc`
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty("message", "querystring/lon must be number");
    expect(response.json()).toHaveProperty("error", "Bad Request");
    expect(response.json()).toHaveProperty("code", "FST_ERR_VALIDATION");
  });

  it("should return an empty array if no stations are found", async () => {
    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}?lat=123&lon=123`
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual([]);
  });

  it("should return the nearest gas stations", async () => {
    await insertGasStations(app);
    const expectedOuput = {
      id: "6e9c7cce-25bf-45b3-aea1-c5abf8f48e9a",
      ideess: "5786"
    };

    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}?lon=-3.8020353&lat=37.773808&distance=1000`
    });

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.json())).toBe(true);
    expect(response.json()).toHaveLength(1);
    expect(response.json()[0]).toHaveProperty("id", expectedOuput.id);
    expect(response.json()[0]).toHaveProperty("ideess", expectedOuput.ideess);
  });

  it("should return the default number of gas stations if no distance is provided", async () => {
    await insertGasStations(app);
    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}?lon=-3.8020353&lat=37.773808`
    });

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.json())).toBe(true);
    expect(response.json()).toHaveLength(12);
  });

  it("should return an error if distance is not a number", async () => {
    await insertGasStations(app);
    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}?lon=-3.8020353&lat=37.773808&distance=abc`
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty("message", "querystring/distance must be number");
    expect(response.json()).toHaveProperty("error", "Bad Request");
    expect(response.json()).toHaveProperty("code", "FST_ERR_VALIDATION");
  });

  it("should return an error if lat is not provided", async () => {
    await insertGasStations(app);
    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}?lon=-3.8020353&distance=1000`
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty("message", "querystring must have required property 'lat'");
    expect(response.json()).toHaveProperty("error", "Bad Request");
    expect(response.json()).toHaveProperty("code", "FST_ERR_VALIDATION");
  });

  it("should return an error if lon is not provided", async () => {
    await insertGasStations(app);
    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}?lat=37.773808&distance=1000`
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty("message", "querystring must have required property 'lon'");
    expect(response.json()).toHaveProperty("error", "Bad Request");
    expect(response.json()).toHaveProperty("code", "FST_ERR_VALIDATION");
  });

  it("should return an error if lat and lon are not provided", async () => {
    await insertGasStations(app);
    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}?distance=1000`
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty("message", "querystring must have required property 'lat'");
    expect(response.json()).toHaveProperty("error", "Bad Request");
    expect(response.json()).toHaveProperty("code", "FST_ERR_VALIDATION");
  });

  it("should return an error if distance is too large", async () => {
    await insertGasStations(app);
    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}?lon=-3.8020353&lat=37.773808&distance=1000000`
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty("message", "querystring/distance must be <= 20000");
    expect(response.json()).toHaveProperty("error", "Bad Request");
    expect(response.json()).toHaveProperty("code", "FST_ERR_VALIDATION");
  });

  it("should return an error if distance is too small", async () => {
    await insertGasStations(app);
    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}?lon=-3.8020353&lat=37.773808&distance=5`
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty("message", "querystring/distance must be >= 10");
    expect(response.json()).toHaveProperty("error", "Bad Request");
    expect(response.json()).toHaveProperty("code", "FST_ERR_VALIDATION");
  });
});
