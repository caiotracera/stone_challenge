import { getRepository, Repository } from 'typeorm';

import UserFavorite from '@modules/users/infra/typeorm/entities/UserFavorite';
import IUserFavoritesRepository from '@modules/users/repositories/IUserFavoritesRepository';
import IAddFavoriteDTO from '@modules/users/dtos/IAddFavoriteDTO';

export default class UserFavoritesRepository
  implements IUserFavoritesRepository {
  private ormRepository: Repository<UserFavorite>;

  constructor() {
    this.ormRepository = getRepository(UserFavorite);
  }

  public async add({
    favorite_id,
    name,
    avatar_url,
    type,
    user_id,
  }: IAddFavoriteDTO): Promise<UserFavorite> {
    console.log({
      favorite_id,
      name,
      avatar_url,
      type,
      user_id,
    });
    const favorite = this.ormRepository.create({
      favorite_id,
      name,
      avatar_url,
      type,
      user_id,
    });

    await this.ormRepository.save(favorite);
    return favorite;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }

  public async listByType(type: string): Promise<UserFavorite[]> {
    const favorites = await this.ormRepository.find({ where: { type } });

    return favorites;
  }

  public async findById(id: string): Promise<UserFavorite | undefined> {
    const favorite = await this.ormRepository.findOne({ id });
    return favorite;
  }
}
