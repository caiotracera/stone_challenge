import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserFavoritesRepository from '@modules/users/repositories/IUserFavoritesRepository';
import IUserFavorite from '@modules/users/infra/typeorm/entities/UserFavorite';

type IRequest = {
  user_id: string;
  favorite_id: number;
};

@injectable()
export default class FindFavoriteByFavoriteIdService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserFavoritesRepository')
    private userFavoritesRepository: IUserFavoritesRepository,
  ) {}

  public async execute({
    favorite_id,
    user_id,
  }: IRequest): Promise<IUserFavorite> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const favorite = await this.userFavoritesRepository.findByFavoriteId(
      favorite_id,
    );

    if (!favorite) {
      throw new AppError('Favorite not found', 404);
    }

    return favorite;
  }
}
