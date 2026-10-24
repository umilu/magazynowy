import { config } from 'dotenv';
import { defineConfig, env } from 'prisma/config';

// Ta sama zasada co w AppModule: NODE_ENV=test oznacza bazę testową.
config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
  quiet: true,
});

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});
