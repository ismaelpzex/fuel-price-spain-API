module.exports = {
  $id: "station-response-dto",
  type: "object",
  additionalProperties: false,
  properties: {
    id: {
      type: "string",
      format: "uuid",
      description: "Unique identifier for the station"
    },
    cp: {
      type: "string",
      maxLength: 10,
      description: "Postal code"
    },
    direccion: {
      type: "string",
      maxLength: 255,
      description: "Address"
    },
    horario: {
      type: "string",
      maxLength: 255,
      description: "Opening hours"
    },
    latitud: {
      type: "number",
      description: "Latitude",
      minimum: -90,
      maximum: 90
    },
    longitud: {
      type: "number",
      description: "Longitude",
      minimum: -180,
      maximum: 180
    },
    localidad: {
      type: "string",
      maxLength: 255,
      description: "Locality"
    },
    margen: {
      type: "string",
      maxLength: 1,
      description: "Margin"
    },
    municipio: {
      type: "string",
      maxLength: 100,
      description: "Municipality"
    },
    precio_biodiesel: {
      type: "string",
      description: "Biodiesel price"
    },
    precio_bioetanol: {
      type: "string",
      description: "Bioethanol price"
    },
    precio_gas_natural_comprimido: {
      type: "string",
      description: "Compressed natural gas price"
    },
    precio_gas_natural_licuado: {
      type: "string",
      description: "Liquefied natural gas price"
    },
    precio_gases_licuados_del_petroleo: {
      type: "string",
      description: "Liquefied petroleum gas price"
    },
    precio_gasoleo_a: {
      type: "string",
      description: "Diesel A price"
    },
    precio_gasoleo_b: {
      type: "string",
      description: "Diesel B price"
    },
    precio_gasoleo_premium: {
      type: "string",
      description: "Premium diesel price"
    },
    precio_gasolina_95_e10: {
      type: "string",
      description: "Gasoline 95 E10 price"
    },
    precio_gasolina_95_e5: {
      type: "string",
      description: "Gasoline 95 E5 price"
    },
    precio_gasolina_95_e5_premium: {
      type: "string",
      description: "Premium gasoline 95 E5 price"
    },
    precio_gasolina_98_e10: {
      type: "string",
      description: "Gasoline 98 E10 price"
    },
    precio_gasolina_98_e5: {
      type: "string",
      description: "Gasoline 98 E5 price"
    },
    precio_hidrogeno: {
      type: "string",
      description: "Hydrogen price"
    },
    provincia: {
      type: "string",
      maxLength: 100,
      description: "Province"
    },
    remision: {
      type: "string",
      maxLength: 255,
      description: "Remission"
    },
    rotulo: {
      type: "string",
      maxLength: 255,
      description: "Sign"
    },
    tipo_venta: {
      type: "string",
      maxLength: 1,
      description: "Sale type"
    },
    porcentaje_bioetanol: {
      type: "string",
      description: "Bioethanol percentage"
    },
    porcentaje_ester_metilico: {
      type: "string",
      description: "Methyl ester percentage"
    },
    ideess: {
      type: "string",
      maxLength: 10,
      description: "Unique identifier for the station",
      unique: true
    },
    idmunicipio: {
      type: "string",
      maxLength: 10,
      description: "Municipality ID"
    },
    idprovincia: {
      type: "string",
      maxLength: 10,
      description: "Province ID"
    },
    idccaa: {
      type: "string",
      maxLength: 10,
      description: "Autonomous community ID"
    },
    last_update: {
      type: "string",
      format: "date-time",
      description: "Last update timestamp"
    }
  },
  required: [
    "id",
    "cp",
    "direccion",
    "latitud",
    "longitud",
    "localidad",
    "margen",
    "municipio",
    "provincia",
    "rotulo",
    "ideess"
  ]
};
