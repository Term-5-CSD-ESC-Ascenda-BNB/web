import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  return {
    plugins: [
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
        verboseFileRoutes: false,
      }),
      react(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        // Workaround for dev mode loading all icons
        // from https://github.com/tabler/tabler-icons/issues/1233#issuecomment-2428245119
        '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
      },
    },
    // root: 'src/',
    base: './',
    publicDir: '../public',
    server: {
      host: true,
    },
    build: {
      outDir: './dist',
      emptyOutDir: true,
      target: 'esnext',
      sourcemap: isProduction ? false : true,
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['/src/tests/setup.ts', '/src/tests/vitest.setup.mjs'],
    },
  };
});
