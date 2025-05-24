/// <reference types="vite/client" />

//ImportMetaEnv: Defines the shape of import.meta.env, listing all available environment variables.
interface ImportMetaEnv {
  readonly VITE_APPWRITE_URL: string;
  readonly VITE_APPWRITE_PROJECT_ID: string;
  readonly VITE_APPWRITE_DATABASE_ID: string;
  readonly VITE_APPWRITE_COLLECTION_ID: string;
  readonly VITE_APPWRITE_BUCKET_ID: string;
}

// ImportMeta: Extends the default ImportMeta interface to include the env property, which holds ImportMetaEnv.
interface ImportMeta {
  env: ImportMetaEnv;
}
