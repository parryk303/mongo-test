import { getRoles, getjobTitles } from '@controllers/roles';
import { isAuthenticated } from '@middlewares/is-authenticated';

const registerRolesRoutes = (router) => {
  router.get('/api/roles', isAuthenticated, getRoles);
  router.get('/api/job-titles', isAuthenticated, getjobTitles);
};

export default registerRolesRoutes;
