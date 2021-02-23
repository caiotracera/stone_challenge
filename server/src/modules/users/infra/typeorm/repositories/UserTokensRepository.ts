import { getRepository, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

export default class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      token: uuid().substring(0, 8),
      user_id,
    });

    await this.ormRepository.save(userToken);
    return userToken;
  }

  public async save(token: UserToken): Promise<UserToken> {
    return this.ormRepository.save(token);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({ where: { token } });
    return userToken;
  }

  public async findByUser(user_id: string): Promise<UserToken[]> {
    const tokens = await this.ormRepository.find({ where: { user_id } });
    return tokens;
  }
}
