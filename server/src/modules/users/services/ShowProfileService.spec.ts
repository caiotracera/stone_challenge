import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileService from '@modules/users/services/ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the users profile', async () => {
    const user = await fakeUsersRepository.create({
      username: 'john.doe',
      email: 'john.doe@example.com',
      password: '123456',
    });

    const profile = await showProfileService.execute({ user_id: user.id });

    expect(profile.username).toBe('john.doe');
    expect(profile.email).toBe('john.doe@example.com');
  });

  it('should not be able to show the profile from a non-existing user', async () => {
    await expect(
      showProfileService.execute({ user_id: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
