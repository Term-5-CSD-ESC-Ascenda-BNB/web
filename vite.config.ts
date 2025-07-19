import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import path from 'path';
import restart from 'vite-plugin-restart';
import glsl from 'vite-plugin-glsl';

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
      restart({ restart: ['../public/**'] }), // Restart server on static file change
      glsl(), // Handle shader files
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
    publicDir: './public',
    server: {
      host: true,
      proxy: {
        '/api': {
          target: 'https://api-production-46df.up.railway.app',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
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
