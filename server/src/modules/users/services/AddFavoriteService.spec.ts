import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserFavoritesRepository from '@modules/users/repositories/fakes/FakeUserFavoritesRepository';
import AddFavoriteService from '@modules/users/services/AddFavoriteService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserFavoritesRepository: FakeUserFavoritesRepository;
let fakeCacheProvider: FakeCacheProvider;
let addFavoritesService: AddFavoriteService;

describe('AddFavorite', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserFavoritesRepository = new FakeUserFavoritesRepository();
    fakeCacheProvider = new FakeCacheProvider();

    addFavoritesService = new AddFavoriteService(
      fakeUsersRepository,
      fakeUserFavoritesRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to add a new favorite', async () => {
    const user = await fakeUsersRepository.create({
      username: 'johndoe',
      email: 'john.doe@example.com',
      password: '123456',
    });

    const favorite = await addFavoritesService.execute({
      user_id: user.id,
      favorite_id: 14785785,
      type: 'characters',
    });

    expect(favorite).toHaveProperty('id');
    expect(favorite.user_id).toEqual(user.id);
  });

  it('should not be able to add a new favorite if user does not exists', async () => {
    await expect(
      addFavoritesService.execute({
        user_id: 'invalid_id',
        favorite_id: 14785785,
        type: 'characters',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
