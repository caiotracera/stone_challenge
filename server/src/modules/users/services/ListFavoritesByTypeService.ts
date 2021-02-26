import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserFavoritesRepository from '@modules/users/repositories/IUserFavoritesRepository';
import IUserFavorite from '@modules/users/infra/typeorm/entities/UserFavorite';

type IRequest = {
  user_id: string;
  type: string;
};

@injectable()
export default class ListFavoritesByTypeServi8ce {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserFavoritesRepository')
    private userFavoritesRepository: IUserFavoritesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ type, user_id }: IRequest): Promise<IUserFavorite[]> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const cacheKey = `favorites-${type}-${user_id}`;
    let favorites = await this.cacheProvider.recover<IUserFavorite[]>(cacheKey);

    /* istanbul ignore else */
    if (!favorites) {
      favorites = await this.userFavoritesRepository.listByType(type);
      await this.cacheProvider.save({ key: cacheKey, value: favorites });
    }

    return favorites;
  }
}
