import { Router } from 'express';

import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import favoritesRouter from '@modules/users/infra/http/routes/favorites.routes';

const routes = Router();
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/users', usersRouter);
routes.use('/me/favorites', favoritesRouter);

export default routes;
