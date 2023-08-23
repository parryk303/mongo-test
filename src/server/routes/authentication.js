import { logout, oauth2 } from '@controllers/authentication';
import { isAuthenticated } from '@middlewares/is-authenticated';

const registerAuthenticationRoutes = (router) => {
  router.get('/api/oauth2', oauth2);
  router.post('/api/logout', isAuthenticated, logout);
};

export default registerAuthenticationRoutes;
