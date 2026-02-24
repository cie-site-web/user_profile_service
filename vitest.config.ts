import { defineConfig } from 'vitest/config';
import path from 'path';
import * as dotenv from 'dotenv';

// Charge les variables d'environnement pour les tests
dotenv.config({ path: '.env' });

export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.{spec,test}.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
});
