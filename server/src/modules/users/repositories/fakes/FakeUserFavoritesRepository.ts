import { v4 as uuid } from 'uuid';

import IUserFavoritesRepository from '@modules/users/repositories/IUserFavoritesRepository';
import IAddFavoriteDTO from '@modules/users/dtos/IAddFavoriteDTO';
import UserFavorite from '@modules/users/infra/typeorm/entities/UserFavorite';

export default class FakeUserFavoritesRepository
  implements IUserFavoritesRepository {
  private favorites: UserFavorite[] = [];

  public async add({
    favorite_id,
    type,
    user_id,
  }: IAddFavoriteDTO): Promise<UserFavorite> {
    const favorite = new UserFavorite();

    Object.assign(favorite, {
      id: uuid(),
      user_id,
      type,
      favorite_id,
    });

    this.favorites.push(favorite);
    return favorite;
  }

  public async delete(id: string): Promise<void> {
    const favoriteIndex = this.favorites.findIndex(
      eachFavorite => eachFavorite.id === id,
    );

    this.favorites.splice(favoriteIndex, 1);
  }

  public async listByType(
    type: 'characters' | 'comics',
  ): Promise<UserFavorite[]> {
    const favoritesList: UserFavorite[] = [];

    this.favorites.forEach(favorite => {
      if (favorite.type === type) {
        favoritesList.push(favorite);
      }
    });

    return favoritesList;
  }

  public async findById(id: string): Promise<UserFavorite | undefined> {
    const favorite = this.favorites.find(
      eachFavorite => eachFavorite.id === id,
    );

    return favorite;
  }
}
