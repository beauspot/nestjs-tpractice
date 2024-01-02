/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { config } from 'dotenv';

config();

const env = (key: any, defaultValue = null) => {
  return process.env[key] || defaultValue;
};

export const AppConfig = {
  PORT: process.env.PORT || 4000,
};
