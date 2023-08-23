import { roles } from '@utils/constants';
import { isAuthorized } from '@middlewares/is-authorized';
import { isAuthenticated } from '@middlewares/is-authenticated';
import { getCurrentUser, createUser, getUsers, patchRole, deleteUser } from '@controllers/user';
import { sortQueryMiddleware } from '@middlewares/sort-query';

const registerUserRoutes = (router) => {
  router.get('/api/users', isAuthenticated, isAuthorized([roles.ADMIN, roles.INTERNAL]), sortQueryMiddleware, getUsers);
  router.get('/api/user/me', isAuthenticated, getCurrentUser);
  router.post('/api/users', isAuthenticated, isAuthorized([roles.ADMIN, roles.INTERNAL]), createUser);
  router.patch('/api/user/:userId/role/:roleId', isAuthenticated, isAuthorized([roles.ADMIN]), patchRole);
  router.delete('/api/user/:id', isAuthenticated, isAuthorized([roles.ADMIN, roles.INTERNAL]), deleteUser);
};
export default registerUserRoutes;
