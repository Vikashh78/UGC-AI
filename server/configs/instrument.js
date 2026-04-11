import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://a2f2453e6f1414c42d74cda7c7386534@o4511203001303040.ingest.us.sentry.io/4511203009232896",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});
