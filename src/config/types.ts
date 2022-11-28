import { RuntimeEnvironment } from 'src/types/common';

export interface AppConfig {
  env: RuntimeEnvironment;
  port: number;
}

export interface MongoConfig {
  port: number;
  host: string;
  user: string;
  password: string;
  database: string;
}

export interface ServicesConfig {
  servers: string;
  users: string;
}
