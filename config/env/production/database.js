const { parse } = require("pg-connection-string");

module.exports = ({ env }) => {
  const databaseUrl = env("DATABASE_URL");
  
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set.");
  }

  const { host, port, database, user, password } = parse(databaseUrl);

  if (!host || !port || !database || !user) {
    throw new Error("Invalid DATABASE_URL format.");
  }

  return {
    connection: {
      client: "postgres",
      connection: {
        host,
        port,
        database,
        user,
        password
      },
      debug: false,
    },
  };
};
