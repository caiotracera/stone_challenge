import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

export default interface IUserTokensRepository {
  generate(user_id: string): Promise<UserToken>;
  save(token: UserToken): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
  findByUser(user_id: string): Promise<UserToken[]>;
}
