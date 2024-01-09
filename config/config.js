const config = {
  development: {
    username: "online_store_user",
    password: "test1234",
    database: "online_store_db",
    host: "localhost",
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: "127.0.0.1",
    dialect: "postgres",
  },
};

module.exports = config;
