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

  logger.info(event, 'Event step two: ');

  if (event.Payload.throwErrorMsg) {
    const error = new Error(event.Payload.throwErrorMsg);

    logger.info(error, 'Error step two: ');

    throw error;
  }

  const {
    Payload: { fullName, city },
  } = event;

  return Promise.resolve({
    address: `${fullName} ${city}`,
  });
};

export const handler = stepOne;
