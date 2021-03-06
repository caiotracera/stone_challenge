import UserFavorite from '@modules/users/infra/typeorm/entities/UserFavorite';
import IAddFavoriteDTO from '@modules/users/dtos/IAddFavoriteDTO';

export default interface IUserFavoritesRepository {
  add(data: IAddFavoriteDTO): Promise<UserFavorite>;
  delete(id: string): Promise<void>;
  listByType(type: string): Promise<UserFavorite[]>;
  findById(id: string): Promise<UserFavorite | undefined>;
  findByFavoriteId(favorite_id: number): Promise<UserFavorite | undefined>;
}
