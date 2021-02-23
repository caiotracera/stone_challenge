import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      username: 'john.doe',
      email: 'john.doe@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a user if e-mail is already in use', async () => {
    const user = await createUserService.execute({
      username: 'john.doe',
      email: 'john.doe@example.com',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        username: 'johntre',
        email: user.email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a user if username is already in use', async () => {
    const user = await createUserService.execute({
      username: 'john.doe',
      email: 'john.doe@example.com',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        username: user.username,
        email: 'john.tre@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
