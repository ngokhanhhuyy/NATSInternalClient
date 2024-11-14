/// <reference types="vite/client" />

declare namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      API_URI_DEV?: string;
      API_URI_PROD?: string;
    }
  
    interface Process {
      env: ProcessEnv;
    }
  }
  
  declare var process: NodeJS.Process;
  