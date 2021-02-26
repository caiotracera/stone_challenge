import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUserFavoritesRepository from '@modules/users/repositories/IUserFavoritesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UserFavorite from '@modules/users/infra/typeorm/entities/UserFavorite';

type IRequest = {
  user_id: string;
  id: string;
};

@injectable()
export default class DeleteFavoriteService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserFavoritesRepository')
    private userFavoritesRepository: IUserFavoritesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<UserFavorite> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const favorite = await this.userFavoritesRepository.findById(id);
    if (!favorite) {
      throw new AppError('Favorite not found', 404);
    }

    if (favorite.user_id !== user.id) {
      throw new AppError('You cannot delete favorites from another user', 403);
    }

    await this.userFavoritesRepository.delete(id);

    await this.cacheProvider.invalidate(
      `favorites-${favorite.type}-${user_id}`,
    );
    return favorite;
  }
}
