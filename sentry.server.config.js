import * as Sentry from '@sentry/nextjs';

const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;
const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  environment: ENVIRONMENT,
  dsn: SENTRY_DSN,
  tracesSampleRate: 1.0,
});
