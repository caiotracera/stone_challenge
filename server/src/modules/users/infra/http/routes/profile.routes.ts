import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

const router = Router();
const profileController = new ProfileController();

router.use(ensureAuthenticated);

router.get('/', profileController.show);

router.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);

export default router;
