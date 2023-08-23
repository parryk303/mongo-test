import * as jose from 'jose';
import { Types } from 'mongoose';

import config from '../config';
import { jwtSecret, symbolMap } from './constants';

export const sendSuccessResponse = ({ res, data = {}, message, statusCode, count, clearCookie = false }) => {
  if (count) {
    data.count = count;
  }

  let response = {
    data,
  };

  if (message) {
    response.message = message;
  }
  if (clearCookie) {
    res.clearCookie('accessToken');
  }
  return res.status(statusCode).json(response);
};

export const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export const sendFailureResponse = ({ res, message, statusCode, errors = [], clearCookie = false }) => {
  let response = {
    error: errors.length > 0 ? errors : message,
  };
  if (clearCookie) {
    res.clearCookie('accessToken');
  }
  return res.status(statusCode).json(response);
};

export const response = function ({ message, statusCode, errors, name, value, res, count }) {
  if (statusCode != 200 && statusCode != 201 && statusCode != 204)
    sendFailureResponse({ res, message, statusCode, errors });
  else
    sendSuccessResponse({
      res,
      data: { [name]: value },
      message,
      statusCode,
      count,
    });
};

export const decodejwt = async (token) => {
  return await jose.jwtVerify(token, jwtSecret);
};

export const signJwt = async (payload, refresh = false) => {
  const expirationTime = refresh == true ? config.refresh_token_expires_in : config.jwt_expiresIn;
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(jwtSecret);
};

export const sendResponse = (res, { statusCode, isBase64Encoded, body, headers }) => {
  res.isBase64Encoded = isBase64Encoded;
  return res.status(statusCode).set(headers).send(body);
};

export const getRootUrl = (url) => {
  let protocol = '';
  let urlWithoutProtocol = url.replace(/(^\w+:|^)\/\//, '');
  let hostName = urlWithoutProtocol.split('/')[0];

  let urlArrayWithProtocol = url.split('//');
  if (urlArrayWithProtocol.length > 1) {
    protocol = urlArrayWithProtocol[0] + '//';
  }

  return protocol + hostName;
};

export const isCircular = (obj) => {
  try {
    JSON.stringify(obj);
    return false;
  } catch (e) {
    return true;
  }
};

export const replaceKeysWithSymbols = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => replaceKeysWithSymbols(item, symbolMap));
  }
  const replacedObj = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const replacedKey = symbolMap[key] !== undefined ? symbolMap[key] : key;
      replacedObj[replacedKey] = replaceKeysWithSymbols(value, symbolMap);
    }
  }
  return replacedObj;
};

export const makeObjectId = (id) => {
  return new Types.ObjectId(id);
};

export const validateProjectUpdatableFields = (projectData, projectFields) => {
  let invalidKeys = [];
  Object.keys(projectData).forEach((key) => {
    if (projectFields[key] != true) {
      invalidKeys.push(key);
    }
  });
  return invalidKeys.length > 0 ? invalidKeys : false;
};

export const addCaseSensitiveInRegex = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    return;
  }
  if ('$regex' in obj) {
    obj['$options'] = 'i';
  }
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (Array.isArray(obj[key])) {
        obj[key].forEach((item) => {
          addCaseSensitiveInRegex(item);
        });
      } else if (typeof obj[key] === 'object') {
        addCaseSensitiveInRegex(obj[key]);
      }
    }
  }
  return obj;
};
