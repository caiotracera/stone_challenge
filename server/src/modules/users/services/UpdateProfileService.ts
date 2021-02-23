import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  username: string;
  email: string;
  password?: string;
  old_password?: string;
}

@injectable()
export default class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    username,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);
    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('Email already in use', 409);
    }

    const userWithUpdatedUsername = await this.usersRepository.findByUsername(
      username,
    );
    if (userWithUpdatedUsername && userWithUpdatedUsername.id !== user.id) {
      throw new AppError('Username already in use', 409);
    }

    user.username = username;
    user.email = email;

    if (password && !old_password) {
      throw new AppError('Old password is required', 400);
    }

    /* istanbul ignore else */
    if (password && old_password) {
      const passwordMatches = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!passwordMatches) {
        throw new AppError('Password is wrong', 403);
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    await this.usersRepository.save(user);
    return user;
  }
}
