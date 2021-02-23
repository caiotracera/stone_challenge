import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      username: 'johndoe',
      email: 'john.doe@example.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      username: 'johntre',
      email: 'john.tre@example.com',
      password: '123456789',
      old_password: '123456',
    });

    expect(updatedUser.username).toBe('johntre');
    expect(updatedUser.email).toBe('john.tre@example.com');
    expect(updatedUser.password).toBe('123456789');
  });

  it('should not be able to update the profile from a non-existing user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'non-existing-id',

        username: 'johntre',
        email: 'john.tre@example.com',
        password: '123456789',
        old_password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change the e-mail to another already in use', async () => {
    await fakeUsersRepository.create({
      username: 'johndoe',
      email: 'john.doe@example.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      username: 'johntre',
      email: 'john.tre@example.com',
      password: '123456789',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,

        username: 'johntre',
        email: 'john.doe@example.com',
        password: '123456789',
        old_password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change the username to another already in use', async () => {
    await fakeUsersRepository.create({
      username: 'johndoe',
      email: 'john.doe@example.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      username: 'johntre',
      email: 'john.tre@example.com',
      password: '123456789',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,

        username: 'johndoe',
        email: 'john.tre@example.com',
        password: '123456789',
        old_password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password without old_password', async () => {
    const user = await fakeUsersRepository.create({
      username: 'johntre',
      email: 'john.tre@example.com',
      password: '123456789',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,

        username: 'johndoe',
        email: 'john.tre@example.com',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password if old_password is wrong', async () => {
    const user = await fakeUsersRepository.create({
      username: 'johntre',
      email: 'john.tre@example.com',
      password: '123456789',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,

        username: 'johndoe',
        email: 'john.tre@example.com',
        password: '123456789',
        old_password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
