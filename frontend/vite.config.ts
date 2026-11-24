import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Minimal declaration so this config type-checks without adding @types/node.
declare const process: { env: Record<string, string | undefined> };

// VITE_POLL=1 switches the file watcher to polling. Use it (npm run dev:poll) on machines
// where the per-user inotify instance limit is exhausted and `vite` fails with EMFILE.
const poll = !!process.env.VITE_POLL;

// In dev and preview, /api is proxied to the Spring Boot backend on :8080.
const proxy = { '/api': 'http://localhost:8080' };

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy,
    watch: poll ? { usePolling: true, interval: 300 } : undefined,
  },
  preview: {
    port: 5173,
    proxy,
  },
});
