import {
  createProjects,
  getConnectivityDetails,
  getProjectDetails,
  getProjects,
  getProjectFields,
  updateProjectDetails,
} from '@controllers/project';
import { isAuthenticated } from '@middlewares/is-authenticated';
import { isAuthorized } from '@middlewares/is-authorized';
import { roles } from '@utils/constants';

const registerProjectRoutes = (router) => {
  router.get(
    '/api/projects',
    isAuthenticated,
    isAuthorized([roles.ADMIN, roles.INTERNAL, roles.CUSTOMER]),
    getProjects
  );
  router.get(
    '/api/project/:id/project-details',
    isAuthenticated,
    isAuthorized([roles.ADMIN, roles.INTERNAL, roles.CUSTOMER]),
    getProjectDetails
  );
  router.get(
    '/api/project/:id/connectivity-details',
    isAuthenticated,
    isAuthorized([roles.ADMIN, roles.INTERNAL, roles.CUSTOMER]),
    getConnectivityDetails
  );
  router.get('/api/project/:id/project-fields', isAuthenticated, getProjectFields);
  router.post('/api/project', isAuthenticated, isAuthorized([roles.ADMIN, roles.INTERNAL]), createProjects);
  router.patch('/api/project/:id/:type', isAuthenticated, updateProjectDetails);
};

export default registerProjectRoutes;
