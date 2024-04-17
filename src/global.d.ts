declare global {
    namespace NodeJS {
      interface ProcessEnv {
        VITE_APP_BACKEND_GRAPHQL: string;
        PORT?: string;
        HOSTIP: string;
      }
    }
  }