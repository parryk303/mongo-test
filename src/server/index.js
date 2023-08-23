import qs from 'qs';
import process from 'process';

import { addPsRequestId } from '@ringcentral-pro-serv/psi-logging-system';

import router from './routes/index';
import logger from '@utils/logger';

export default function init(app) {
  app.use(addPsRequestId);
  app.use('/', (req, res, next) => {
    if (req._parsedUrl.search) {
      req.query = qs.parse(req._parsedUrl.search.replace('?', ''), {
        arrayLimit: Infinity,
        decoder(value) {
          value = decodeURIComponent(value);
          let keywords = {
            true: true,
            false: false,
            null: null,
            undefined: undefined,
          };
          if (value in keywords) {
            return keywords[value];
          }

          return value;
        },
        depth: 20,
      });
    }
    next();
  });

  app.use(router);

  process
    .on('unhandledRejection', (reason) => {
      logger.error({
        message: { customMessage: 'Unhandled Rejection', reason: reason?.message, stack: reason?.stack },
      });
    })
    .on('uncaughtException', (err) => {
      logger.error({
        message: { customMessage: 'Uncaught Exception thrown', error: err?.message, stack: err?.stack },
      });
    });
}
