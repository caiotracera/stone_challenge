import { Router } from 'express';

import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';

const routes = Router();
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

export default routes;
