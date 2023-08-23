import ConnectivityType from '@models/connectivity-type';

export const getConnectivityTypesSvc = async () => {
  let connectivityTypes = await ConnectivityType.find();
  return {
    message: 'Success',
    statusCode: 200,
    name: 'connectivityTypes',
    value: connectivityTypes,
  };
};
