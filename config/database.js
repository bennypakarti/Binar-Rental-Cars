const {
  DB_USERNAME = "postgres",
  DB_PASSWORD = "123",
  DB_HOST = "127.0.0.1",
  DB_NAME = "db_carRental",
  PORT = "3011s",
} = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_NAME}_ch6_development`,
    host: DB_HOST,
    dialect: "postgres",
    port: PORT,
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_NAME}_ch6_test`,
    host: DB_HOST,
    dialect: "postgres",
    port: 3011,
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_NAME}_ch6_production`,
    host: DB_HOST,
    dialect: "postgres",
    port: 3011,
  },
  seederStorage: "sequelize",
};
