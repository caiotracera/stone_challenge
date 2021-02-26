import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import FavoritesController from '@modules/users/infra/http/controllers/FavoritesController';

const router = Router();
const favoritesController = new FavoritesController();

router.use(ensureAuthenticated);
router.get(
  '/:type',
  celebrate({
    [Segments.PARAMS]: {
      type: Joi.string().required(),
    },
  }),
  favoritesController.index,
);

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      favorite_id: Joi.number().required(),
      type: Joi.string().required(),
    },
  }),
  favoritesController.create,
);

router.delete('/:id', favoritesController.destroy);
