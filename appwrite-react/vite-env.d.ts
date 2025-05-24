/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_URL: string; // Add your env variables here
}

interface ImportMeta {
  env: ImportMetaEnv;
}
