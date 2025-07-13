// env.d.ts or types/env.d.ts
export {};

declare global {
  interface Window {
    __APP_CONFIG__: {
      BASE_URL: string;
      VITE_BACKEND_URL_DEV: string;
      VITE_BACKEND_URL_QA: string;
      VITE_BACKEND_URL_PROD: string;
      VITE_ENV_MODE: string;
      [key: string]: any;
    };
  }
}
