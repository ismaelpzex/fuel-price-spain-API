const {build} = require("../../helper");
const insertGasStations = require("./helpers/insert-gas-stations");
const stations = require("./fixtures/gas-stations");

describe("GET /stations/:id", () => {
  let app;
  const baseUrl = "api/v1/stations";

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
      url: `${baseUrl}/f47ac10b-58cc-4372-a567-0e02b2c3d479`
    });

    expect(response.statusCode).toBe(404);
    expect(response.json()).toHaveProperty("message", "Station not found");
    expect(response.json()).toHaveProperty("error", "Not Found");
  });

  it("should return the gas station details", async () => {
    await insertGasStations(app);
    const {id} = stations[0];
    const output = {
      id: "16fd698a-b563-4dbf-b792-e9718319be7e",
      cp: "23001",
      direccion: "CARRETERA N-321 KM. 60,3",
      horario: "L-S: 06:30-22:00; D: 07:30-22:00",
      latitud: 37.784361,
      longitud: -3.826611,
      localidad: "JAEN",
      margen: "D",
      municipio: "Jaén",
      precio_biodiesel: "",
      precio_bioetanol: "",
      precio_gas_natural_comprimido: "",
      precio_gas_natural_licuado: "",
      precio_gases_licuados_del_petroleo: "",
      precio_gasoleo_a: "1,519",
      precio_gasoleo_b: "",
      precio_gasoleo_premium: "1,589",
      precio_gasolina_95_e10: "",
      precio_gasolina_95_e5: "1,629",
      precio_gasolina_95_e5_premium: "",
      precio_gasolina_98_e10: "",
      precio_gasolina_98_e5: "1,739",
      precio_hidrogeno: "",
      provincia: "JAÉN",
      remision: "OM",
      rotulo: "REPSOL",
      tipo_venta: "P",
      porcentaje_bioetanol: "0,0",
      porcentaje_ester_metilico: "0,0",
      ideess: "6703",
      idmunicipio: "3543",
      idprovincia: "23",
      idccaa: "01",
      last_update: ""
    };

    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}/${id}`
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual(output);
  });

  it("should return 400 if the id is not a valid UUID", async () => {
    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}/123`
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty("message", 'params/id must match format "uuid"');
    expect(response.json()).toHaveProperty("error", "Bad Request");
    expect(response.json()).toHaveProperty("code", "FST_ERR_VALIDATION");
  });

  it("should return 400 if the id is not provided", async () => {
    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}/`
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty("message", 'params/id must match format "uuid"');
    expect(response.json()).toHaveProperty("error", "Bad Request");
    expect(response.json()).toHaveProperty("code", "FST_ERR_VALIDATION");
  });

  it("should return JSON response", async () => {
    await insertGasStations(app);
    const {id} = stations[0];

    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}/${id}`
    });

    expect(response.headers["content-type"]).toMatch(/application\/json/);
  });

    it("should handle server errors gracefully", async () => {
    // Simulate a server error by mocking the database query
    jest.spyOn(app.pg, 'query').mockImplementationOnce(() => {
      throw new Error("Server error");
    });

    const response = await app.inject({
      method: "GET",
      url: `${baseUrl}/f47ac10b-58cc-4372-a567-0e02b2c3d479`
    });

    expect(response.statusCode).toBe(500);
    expect(response.json()).toHaveProperty("message", "Server error");
    expect(response.json()).toHaveProperty("error", "Internal Server Error");
  });
});
