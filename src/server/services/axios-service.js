import axios from 'axios';

import logger from '@utils/logger';
import { isCircular } from '@utils/utils';

export const axiosRequest = async ({ method, data, headers, url }) => {
  let requestObj = {
    method,
    url,
    data,
    headers,
  };
  try {
    let response = await axios(requestObj);
    logger.info({
      message: {
        customMessage: 'api request',
        url: requestObj.url,
        payload: isCircular(requestObj.data) ? {} : requestObj.data,
        headers: requestObj.headers,
        method: requestObj.method,
      },
    });
    logger.info({
      message: {
        customMessage: 'api response',
        body: requestObj.responseType != 'stream' && response && response.data,
        url: requestObj.url,
        headers: response && response.headers,
      },
    });
    return response;
  } catch (error) {
    logger.info({
      message: {
        customMessage: 'request',
        url: requestObj.url,
        payload: isCircular(requestObj.data) ? {} : requestObj.data,
        headers: requestObj.headers,
      },
    });
    error.response &&
      error.response.data &&
      logger.info({ message: { customMessage: 'response', ...error.response.data } });
    error.request = requestObj;
    error.status = error?.response?.status;
    error.response = error.response && error.response.data ? error.response.data : error;
    error.url = requestObj.url;
    throw error;
  }
};
