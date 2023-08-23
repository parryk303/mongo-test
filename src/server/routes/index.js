import express from 'express';

import { sendSuccessResponse } from '@utils/utils';
import registerAuthenticationRoutes from './authentication';
import registerContactRoutes from './contact';
import registerProjectRoutes from './project';
import registerUserRoutes from './user';
import registerProjectRequestRoutes from './project-request';
import registerConnectivityTypeRoutes from './connectivity-type';
import registerSowRoutes from './sow';
import registerRolesRoutes from './roles';
import registerMessageCertificateRoutes from './message-certificate';

const router = express.Router();

router.get('/api/version', (req, res) => {
  sendSuccessResponse({
    res,
    data: {
      release: process.env.RELEASE_NUMBER || 0.1,
      build: process.env.BUILD_NUMBER || 0.1,
      date: process.env.BUILD_DATE || new Date().toISOString().replace('T', ' ').slice(0, 19),
    },
    message: null,
    statusCode: 200,
  });
});
registerAuthenticationRoutes(router);
registerContactRoutes(router);
registerProjectRoutes(router);
registerUserRoutes(router);
registerProjectRequestRoutes(router);
registerConnectivityTypeRoutes(router);
registerSowRoutes(router);
registerRolesRoutes(router);
registerMessageCertificateRoutes(router);
export default router;
