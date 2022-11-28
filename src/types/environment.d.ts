import { RuntimeEnvironment } from './common';
import { RuntimeEnvironment } from './config/types';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      ENV: RuntimeEnvironment;

      MONGODB_PASSWORD: string;
      MONGODB_USER: string;
      MONGODB_HOST: string;
      MONGODB_ACCESS_PORT: number;
      MONGODB_DATABASE: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
