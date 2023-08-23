import { roles } from '@utils/constants';
import { getContacts } from '@controllers/contact';
import { isAuthorized } from '@middlewares/is-authorized';
import { isAuthenticated } from '@middlewares/is-authenticated';

const registerContactRoutes = (router) => {
  router.get('/api/project/:id/contacts', isAuthenticated, isAuthorized([roles.ADMIN, roles.INTERNAL]), getContacts);
};
export default registerContactRoutes;
