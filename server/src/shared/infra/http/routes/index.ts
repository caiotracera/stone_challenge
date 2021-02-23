import { Router } from 'express';

import passwordRouter from '@modules/users/infra/http/routes/password.routes';

const routes = Router();
routes.use('/password', passwordRouter);

export default routes;
