import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { I18nProvider, loadInitialLang } from './i18n';
import './styles/index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000, retry: false, refetchOnWindowFocus: false },
  },
});

// Pages and languages are separate files with hashed names. After a new deploy, a visitor who
// still has the old page open asks for files that no longer exist. Vite reports that with
// this event; reloading fetches the new version. The timestamp stops a reload loop if the
// files are really missing (then the error is shown instead).
const RELOAD_KEY = 'btm-chunk-reload';
window.addEventListener('vite:preloadError', (event) => {
  try {
    const last = Number(window.sessionStorage.getItem(RELOAD_KEY) || 0);
    if (Date.now() - last < 10_000) return;
    window.sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
  } catch {
    // Storage unavailable: reload anyway (at worst once per failed navigation).
  }
  event.preventDefault();
  window.location.reload();
});

// The starting language is loaded first, so Romanian visitors do not see English flash.
// For English this resolves immediately.
loadInitialLang().then((initial) => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <I18nProvider initial={initial}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </I18nProvider>
      </QueryClientProvider>
    </React.StrictMode>,
  );
});
