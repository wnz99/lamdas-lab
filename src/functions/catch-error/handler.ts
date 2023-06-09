import { Context } from 'aws-lambda';
import pino from 'pino';
import { lambdaRequestTracker, pinoLambdaDestination } from 'pino-lambda';

const destination = pinoLambdaDestination();

const logger = pino({}, destination);
const withRequest = lambdaRequestTracker();

type Payload = {
  fullName: string;
  city: string;
  throwErrorMsg?: string;
};

type Event = {
  Payload: Payload;
};

const stepOne = (event: Event, context: Context) => {
  withRequest(event, context);

  logger.info(event, 'Event catch error: ');

  return Promise.resolve(true);
};

export const handler = stepOne;
