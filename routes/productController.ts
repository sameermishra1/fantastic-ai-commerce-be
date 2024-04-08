import { Request, Response } from 'express';
import { createClient } from '@commercetools/sdk-client';
import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth';
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const projectKey = 'your-project-key';
const clientId = 'your-client-id';
const clientSecret = 'your-client-secret';
const authUrl = 'https://auth.commercetools.co';
const apiUrl = 'https://api.commercetools.co';

const client = createClient({
  middlewares: [
    createAuthMiddlewareForClientCredentialsFlow({
      host: authUrl,
      projectKey,
      credentials: {
        clientId,
        clientSecret,
      },
    }),
    createHttpMiddleware({ host: apiUrl }),
  ],
});

const apiRoot = createApiBuilderFromCtpClient(client);

export const getProductById = async (req: Request, res: Response) => {
  try {
    const response = await apiRoot.withProjectKey({ projectKey }).products().withId({ ID: req.params.id }).get().execute();
    res.send(response.body);
  } catch (error) {
    res.send((error as Error).toString());
  }
};