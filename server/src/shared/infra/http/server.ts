import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';

import AppError from '@shared/errors/AppError';

const app = express();
app.use(cors());
app.use(express.json());
app.use(errors());

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
    .json({ status: 'error', message: 'Internal server errror' });
});

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});
