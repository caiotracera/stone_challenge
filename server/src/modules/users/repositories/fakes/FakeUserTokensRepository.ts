import { v4 as uuid } from 'uuid';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

export default class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid().substring(0, 8),
      user_id,
      used: false,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.userTokens.push(userToken);
    return userToken;
  }

  public async save(token: UserToken): Promise<UserToken> {
    const userTokenIndex = this.userTokens.findIndex(
      eachToken => eachToken.id === token.id,
    );

    this.userTokens[userTokenIndex] = token;
    return token;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(
      eachToken => eachToken.token === token,
    );

    return userToken;
  }

  public async findByUser(user_id: string): Promise<UserToken[]> {
    const tokens: UserToken[] = [];

    this.userTokens.forEach(eachToken => {
      if (eachToken.user_id === user_id) {
        tokens.push(eachToken);
      }
    });

    return tokens;
  }
}
