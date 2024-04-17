
interface ImportMetaEnv {
    readonly VITE_APP_GOOGLE_CLIENT_ID: string;
    readonly VITE_APP_BACKEND_ADDRESS: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }