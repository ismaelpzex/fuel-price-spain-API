const {build} = require("../../helper");
const insertGasStations = require("./helpers/insert-gas-stations");
const stations = require("./fixtures/gas-stations");

describe("GET /stations/province/:province", () => {
  let app;
  const baseUrl = "api/v1/stations/province";

  beforeAll(async () => {
    app = await build();
  });

  beforeEach(async () => {
    await app.pg.query("TRUNCATE TABLE stations CASCADE");
  });

  afterAll(async () => {
    await app.close();
  });

  it("should return 404 if the station does not exist", async () => {
    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}/qwertyuiop`
    });

    expect(response.statusCode).toBe(404);
    expect(response.json()).toHaveProperty("message", "Station not found");
    expect(response.json()).toHaveProperty("error", "Not Found");
  });

  it("should return the station by province", async () => {
    await insertGasStations(app);

    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}/${stations[0].localidad}`
    });

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.json())).toBeTruthy();
    expect(response.json()).toHaveLength(12);
  });

  it("should return the station by province with a different case", async () => {
    await insertGasStations(app);

    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}/${stations[0].localidad.toLocaleLowerCase()}`
    });

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.json())).toBeTruthy();
    expect(response.json()).toHaveLength(12);
  });

  it("should return the station by province with accented characters", async () => {
    await insertGasStations(app);

    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}/Jaén`
    });

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.json())).toBeTruthy();
    expect(response.json()).toHaveLength(12);
  });

  it("should return the station by province with accented characters and a different case", async () => {
    await insertGasStations(app);

    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}/jaén`
    });

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.json())).toBeTruthy();
    expect(response.json()).toHaveLength(12);
  });

  it("should return an error if the province is not provided", async () => {
    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}/`
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty("message", "params/province must NOT have fewer than 2 characters");
    expect(response.json()).toHaveProperty("error", "Bad Request");
    expect(response.json()).toHaveProperty("code", "FST_ERR_VALIDATION");
  });

  it("should return an error if the province is too short", async () => {
    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}/a`
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty("message", "params/province must NOT have fewer than 2 characters");
    expect(response.json()).toHaveProperty("error", "Bad Request");
    expect(response.json()).toHaveProperty("code", "FST_ERR_VALIDATION");
  });

  it("should return an error if the province is not a string", async () => {
    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}/123`
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty("message", 'params/province must match pattern "^[a-zA-ZáéíóúÁÉÍÓÚ]+$"');
    expect(response.json()).toHaveProperty("error", "Bad Request");
    expect(response.json()).toHaveProperty("code", "FST_ERR_VALIDATION");
  });

});
