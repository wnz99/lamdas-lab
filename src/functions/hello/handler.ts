import middy from '@middy/core';

import type { ValidatedEventAPIGatewayProxyEvent } from '../../libs/api-gateway';
import { formatJSONResponse } from '../../libs/api-gateway';
import schema from './schema';

export const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event,
) => {
  return Promise.resolve(
    formatJSONResponse({
      message: `Hello welcome to the exciting Serverless world!`,
      event,
    }),
  );
};

export const handler = middy(hello);
