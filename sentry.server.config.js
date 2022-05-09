import * as Sentry from '@sentry/nextjs';

const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;
const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  environment: ENVIRONMENT,
  dsn: SENTRY_DSN,
  tracesSampler: () => {
    if (ENVIRONMENT === 'production') {
      return 0.1;
    }

    return 0.5;
  },
});
