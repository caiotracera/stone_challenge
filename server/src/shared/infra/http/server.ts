import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import * as Sentry from '@sentry/node';

import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import rateLimiter from '@shared/infra/http/middlewares/rateLimiter';
import initSentry from '@shared/infra/http/middlewares/sentry';
import routes from '@shared/infra/http/routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

initSentry(app);
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(rateLimiter);
app.use(routes);
app.use(errors());
app.use(Sentry.Handlers.errorHandler());

app.use((error: Error, request: Request, response: Response) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  console.log(error);

  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
});

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});
