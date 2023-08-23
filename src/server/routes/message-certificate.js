import {
  uploadMessageCertificate,
  getMessageCertificate,
  deleteMessageCertificate,
} from '@controllers/message-certificate';
import { isAuthenticated } from '@middlewares/is-authenticated';
import { isAuthorized } from '@middlewares/is-authorized';
import { uploadFile } from '@middlewares/multer';
import { roles } from '@utils/constants';

const registerMessageCertificateRoutes = (router) => {
  router.get('/api/message-certificate/:id', isAuthenticated, getMessageCertificate);
  router.post(
    '/api/message-certificate',
    isAuthenticated,
    isAuthorized([roles.ADMIN, roles.INTERNAL]),
    uploadFile,
    uploadMessageCertificate
  );
  router.delete(
    '/api/message-certificate/:id',
    isAuthenticated,
    isAuthorized([roles.ADMIN, roles.INTERNAL]),
    deleteMessageCertificate
  );
};

export default registerMessageCertificateRoutes;
