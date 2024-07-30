CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE EXTENSION IF NOT EXISTS "postgis";

CREATE EXTENSION IF NOT EXISTS "unaccent";

CREATE TABLE stations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    cp VARCHAR(10),
    direccion VARCHAR(255),
    horario VARCHAR(255),
    latitud NUMERIC(9, 6),
    longitud NUMERIC(9, 6),
    localidad VARCHAR(255),
    margen VARCHAR(1),
    municipio VARCHAR(100),
    precio_biodiesel VARCHAR(10),
    precio_bioetanol VARCHAR(10),
    precio_gas_natural_comprimido VARCHAR(10),
    precio_gas_natural_licuado VARCHAR(10),
    precio_gases_licuados_del_petroleo VARCHAR(10),
    precio_gasoleo_a VARCHAR(10),
    precio_gasoleo_b VARCHAR(10),
    precio_gasoleo_premium VARCHAR(10),
    precio_gasolina_95_e10 VARCHAR(10),
    precio_gasolina_95_e5 VARCHAR(10),
    precio_gasolina_95_e5_premium VARCHAR(10),
    precio_gasolina_98_e10 VARCHAR(10),
    precio_gasolina_98_e5 VARCHAR(10),
    precio_hidrogeno VARCHAR(10),
    provincia VARCHAR(100),
    remision VARCHAR(255),
    rotulo VARCHAR(255),
    tipo_venta VARCHAR(1),
    porcentaje_bioetanol VARCHAR(5),
    porcentaje_ester_metilico VARCHAR(5),
    ideess VARCHAR(10) UNIQUE NOT NULL,
    idmunicipio VARCHAR(10),
    idprovincia VARCHAR(10),
    idccaa VARCHAR(10),
    last_update TIMESTAMP DEFAULT NULL
);

CREATE INDEX idx_locations_geom ON stations USING GIST (ST_MakePoint(longitud, latitud));

ALTER TABLE stations ADD CONSTRAINT unique_ideess UNIQUE (ideess);