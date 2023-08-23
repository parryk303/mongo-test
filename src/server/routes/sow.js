import { getSow, uploadSow } from '@controllers/sow';
import { isAuthenticated } from '@middlewares/is-authenticated';
import { uploadFile } from '@middlewares/multer';

const registerSowRoutes = (router) => {
  router.get('/api/project/:id/sow', isAuthenticated, getSow);
  router.post('/api/upload/sow', isAuthenticated, uploadFile, uploadSow);
};

export default registerSowRoutes;
