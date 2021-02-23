import { Express } from 'express';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

export default function initSentry(app: Express): void {
  if (process.env.NODE_ENV === 'development') {
    console.log('🛑 Skipping sentry init in development build');
    return;
  }

  if (!process.env.SENTRY_DSN || !process.env.SENTRY_DSN.startsWith('https')) {
    console.log('Skipping sentry init (DSN not set up)', {
      dsn: process.env.SENTRY_DSN,
    });
  }

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
  });
}
