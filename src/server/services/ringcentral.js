import { basicToken } from '@utils/constants';
import { axiosRequest } from './axios-service';

export const getRCToken = async (data) => {
  let rcToken = await axiosRequest({
    method: 'POST',
    url: `${process.env.RINGCENTRAL_SERVER_URL}/restapi/oauth/token`,
    headers: {
      Authorization: `Basic ${basicToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: new URLSearchParams(data),
  });

  return rcToken.data;
};

export const getRCUserByExtensionId = async (extensionId, accessToken) => {
  const rcUserDataResponse = await axiosRequest({
    method: 'GET',
    url: `${process.env.RINGCENTRAL_SERVER_URL}/restapi/v1.0/account/~/extension/${extensionId}`,
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return rcUserDataResponse.data;
};

export const getAccessTokenFromRC = async (refreshToken) => {
  const data = {
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
    client_id: process.env.RINGCENTRAL_CLIENT_ID,
  };
  let rcToken = await axiosRequest({
    method: 'POST',
    url: `${process.env.RINGCENTRAL_SERVER_URL}/restapi/oauth/token`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: new URLSearchParams(data),
  });
  return rcToken.data;
};
