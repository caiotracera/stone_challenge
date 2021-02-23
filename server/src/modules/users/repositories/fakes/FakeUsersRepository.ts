import { v4 as uuid } from 'uuid';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

export default class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create({
    username,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: uuid(),
      username,
      email,
      password,
    });

    this.users.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex(eachUser => eachUser.id === user.id);

    this.users[userIndex] = user;
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(eachUser => eachUser.id === id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(eachUser => eachUser.email === email);
    return user;
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    const user = this.users.find(eachUser => eachUser.username === username);
    return user;
  }
}
