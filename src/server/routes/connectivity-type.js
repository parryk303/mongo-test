import { getConnectivityTypes } from '@controllers/connectivity-type';
import { isAuthenticated } from '@middlewares/is-authenticated';

const registerConnectivityTypeRoutes = (router) => {
  router.get('/api/connectivity-types', isAuthenticated, getConnectivityTypes);
};

export default registerConnectivityTypeRoutes;
