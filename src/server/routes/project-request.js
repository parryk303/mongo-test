import {
  patchProjectRequest,
  getProjectRequest,
  patchProjectRequestStatus,
  getProjectRequestById,
} from '@controllers/project';
import { isAuthenticated } from '@middlewares/is-authenticated';
import { isAuthorized } from '@middlewares/is-authorized';
import { roles } from '@utils/constants';

const registerProjectRequestRoutes = (router) => {
  router.get(
    '/api/project-request',
    isAuthenticated,
    isAuthorized([roles.ADMIN, roles.INTERNAL, roles.CUSTOMER]),
    getProjectRequest
  );
  router.get(
    '/api/project-request/:id',
    isAuthenticated,
    isAuthorized([roles.ADMIN, roles.INTERNAL, roles.CUSTOMER]),
    getProjectRequestById
  );
  router.patch(
    '/api/project-request/:id/status',
    isAuthenticated,
    isAuthorized([roles.ADMIN]),
    patchProjectRequestStatus
  );
  router.patch('/api/project-request/:id', isAuthenticated, isAuthorized([roles.ADMIN]), patchProjectRequest);

};

export default registerProjectRequestRoutes;
