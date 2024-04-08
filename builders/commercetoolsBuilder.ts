import fetch from 'node-fetch';
import {
  ClientBuilder,

  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';
import {
    ApiRoot,
    createApiBuilderFromCtpClient,
  } from '@commercetools/platform-sdk';

import dotenv from 'dotenv';

dotenv.config();

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const region = process.env.REGION;
const projectKey = process.env.PROJECT_KEY;


if (!projectKey || !process.env.SCOPES || !clientID || !clientSecret || !region) {
  console.error('Error: Required environment variables PROJECT_KEY or SCOPES are not defined');
  process.exit(1);
}
const scopes = process.env.SCOPES.split(',');
const apiURL = `https://api.${region}.gcp.commercetools.com`;
const authURL = `https://auth.${region}.gcp.commercetools.com`;
// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: authURL,
  projectKey: projectKey,
  credentials: {
    clientId: clientID,
    clientSecret: clientSecret,
  },
  scopes,
  fetch,
};

// Configure httpMiddlewareOptions

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: apiURL,
  fetch,
};

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();

    // Create apiRoot from the imported ClientBuilder and include your Project key
export const apiRoot = createApiBuilderFromCtpClient(ctpClient)
.withProjectKey({ projectKey: projectKey });
