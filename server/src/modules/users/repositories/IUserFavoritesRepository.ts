import UserFavorite from '@modules/users/infra/typeorm/entities/UserFavorite';
import IAddFavoriteDTO from '@modules/users/dtos/IAddFavoriteDTO';

export default interface IUserFavoritesRepository {
  add(data: IAddFavoriteDTO): Promise<UserFavorite>;
  delete(id: string): Promise<void>;
  listByType(type: 'characters' | 'comics'): Promise<UserFavorite[]>;
}
