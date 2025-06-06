import express from 'express';
import dotenv from 'dotenv';
import errorHandler from './middleware/errorHandler.mjs';
import { logger } from './middleware/logger.mjs';
import AppError from './models/appError.mjs';
import blockchainRoutes from './routes/blockchainRoutes.mjs';

dotenv.config({ path: './config/config.env' });
const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(logger);
}

app.use('/api', blockchainRoutes);

app.use(errorHandler);

app.all('*', (req, res, next) => {
  next(
    new AppError(
      `Unfortnately, we can't find the page you are looking for, ${req.originalUrl}`,
      404
    )
  );
});

export { app };
