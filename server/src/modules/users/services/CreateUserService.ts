import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import User from '@modules/users/infra/typeorm/entities/User';

type IRequest = {
  username: string;
  email: string;
  password: string;
};

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ username, email, password }: IRequest): Promise<User> {
    const emailInUse = await this.usersRepository.findByEmail(email);
    if (emailInUse) {
      throw new AppError('E-mail already in use', 409);
    }

    const usernameInUse = await this.usersRepository.findByUsername(username);
    if (usernameInUse) {
      throw new AppError('Username already in use', 409);
    }

    const user = await this.usersRepository.create({
      username,
      email,
      password: await this.hashProvider.generateHash(password),
    });

    return user;
  }
}
