import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AddFavoriteService from '@modules/users/services/AddFavoriteService';
import DeleteFavoriteService from '@modules/users/services/DeleteFavoriteService';
import ListFavoritesByTypeService from '@modules/users/services/ListFavoritesByTypeService';
import FindFavoriteByFavoriteId from '@modules/users/services/FindFavoriteByFavoriteIdService';

type ICreateBody = {
  favorite_id: number;
  type: string;
  name: string;
  avatar_url: string;
};

export default class FavoritesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listFavoritesByTypeService = container.resolve(
      ListFavoritesByTypeService,
    );

    const favorites = await listFavoritesByTypeService.execute({
      type: request.params.type,
      user_id: request.user.id,
    });

    return response.status(200).json(favorites);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const findFavoriteByFavoriteId = container.resolve(
      FindFavoriteByFavoriteId,
    );

    const favorite = await findFavoriteByFavoriteId.execute({
      user_id: request.user.id,
      favorite_id: Number(request.params.favorite_id),
    });

    return response.status(200).json(favorite);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { favorite_id, type, name, avatar_url } = request.body as ICreateBody;

    const addFavoriteService = container.resolve(AddFavoriteService);

    const favorite = await addFavoriteService.execute({
      favorite_id,
      type,
      user_id: request.user.id,
      name,
      avatar_url,
    });

    return response.status(201).json(favorite);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const deleteFavoriteService = container.resolve(DeleteFavoriteService);

    await deleteFavoriteService.execute({
      id: request.params.id,
      user_id: request.user.id,
    });

    return response.status(204).send();
  }
}
