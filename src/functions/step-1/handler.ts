import { Context } from 'aws-lambda';
import pino from 'pino';
import { lambdaRequestTracker, pinoLambdaDestination } from 'pino-lambda';

const destination = pinoLambdaDestination();

const logger = pino({}, destination);
const withRequest = lambdaRequestTracker();

type Payload = {
  name: string;
  surname: string;
  city: string;
  throwErrorMsg?: string;
};

type Event = {
  Payload: Payload;
};

const stepOne = async (event: Event, context: Context) => {
  withRequest(event, context);

  logger.info(event, 'Event step one: ');

  if (event.Payload.throwErrorMsg) {
    const error = new Error(event.Payload.throwErrorMsg);

    logger.info(error, 'Error step one: ');

    throw error;
  }

  const {
    Payload: { name, surname, city },
  } = event;

  return Promise.resolve({
    fullName: `${name} ${surname}`,
    city: city,
  });
};

export const handler = stepOne;
