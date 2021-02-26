import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUserFavoritesRepository from '@modules/users/repositories/IUserFavoritesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UserFavorite from '@modules/users/infra/typeorm/entities/UserFavorite';

type IRequest = {
  favorite_id: number;
  user_id: string;
  type: 'characters' | 'comics';
};

@injectable()
export default class AddFavoriteService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserFavoritesRepository')
    private userFavoritesRepository: IUserFavoritesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    favorite_id,
    user_id,
    type,
  }: IRequest): Promise<UserFavorite> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const favorite = await this.userFavoritesRepository.add({
      favorite_id,
      user_id,
      type,
    });

    await this.cacheProvider.invalidate(`favorites-${type}-${user_id}`);
    return favorite;
  }
}
