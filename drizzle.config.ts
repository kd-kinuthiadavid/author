import type { Config } from 'drizzle-kit';

export function drizzleConfig() {
  return {
    schema: './src/db/schema/*',
    out: './drizzle',
    driver: 'mysql2',
    dbCredentials: {
      connectionString: process.env['DATABASE_URL'],
    },
  };
}

export default drizzleConfig() satisfies Config;
