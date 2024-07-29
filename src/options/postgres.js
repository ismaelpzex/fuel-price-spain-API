const envalid = require("envalid");

const env = envalid.cleanEnv(process.env, {
  POSTGRES_USER: envalid.str({
    desc: "Postgress user",
    default: "example"
  }),
  POSTGRES_HOST: envalid.host({
    desc: "Postgress host",
    default: "db"
  }),
  POSTGRES_DATABASE: envalid.str({
    desc: "Postgress database",
    default: "db"
  }),
  POSTGRES_PASSWORD: envalid.str({
    desc: "Postgress password",
    default: "example"
  }),
  POSTGRES_PORT: envalid.port({
    desc: "Postgress port",
    default: 5432
  })
});

module.exports = {
  user: env.POSTGRES_USER,
  host: env.POSTGRES_HOST,
  database: env.POSTGRES_DATABASE,
  password: env.POSTGRES_PASSWORD,
  port: env.POSTGRES_PORT
};
