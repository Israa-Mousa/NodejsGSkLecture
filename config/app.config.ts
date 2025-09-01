// export const isProduction = process.env.NODE_ENV === 'production';
// export const APP_PORT = process.env.APP_PORT || 3000;
import { getEnvOrThrow } from '../utils/utils';
export const isProduction = getEnvOrThrow('NODE_ENV') === 'production';