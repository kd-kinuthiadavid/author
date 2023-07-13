function dbConfig() {
  return {
    host: process.env['DATABASE_HOST'],
    username: process.env['DATABASE_USERNAME'],
    password: process.env['DATABASE_PASSWORD'],
  };
}

export default dbConfig;
