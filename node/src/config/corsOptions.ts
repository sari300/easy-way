import type { CorsOptions } from 'cors';

const localOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];

const envOrigins = (process.env.CLIENT_URL || '')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

const allowedOrigins = [...localOrigins, ...envOrigins];

export const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  optionsSuccessStatus: 200,
};
