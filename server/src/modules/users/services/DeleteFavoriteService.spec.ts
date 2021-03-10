import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserFavoritesRepository from '@modules/users/repositories/fakes/FakeUserFavoritesRepository';
import DeleteFavoriteService from '@modules/users/services/DeleteFavoriteService';

let fakeCacheProvider: FakeCacheProvider;
let fakeUsersRepository: FakeUsersRepository;
let fakeUserFavoritesRepository: FakeUserFavoritesRepository;
let deleteFavoriteService: DeleteFavoriteService;

describe('DeleteFavorite', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserFavoritesRepository = new FakeUserFavoritesRepository();

    deleteFavoriteService = new DeleteFavoriteService(
      fakeUsersRepository,
      fakeUserFavoritesRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to delete a favorite', async () => {
    const user = await fakeUsersRepository.create({
      username: 'johndoe',
      email: 'john.doe@example.com',
      password: '123456',
    });

    const favorite = await fakeUserFavoritesRepository.add({
      user_id: user.id,
      favorite_id: 14785785,
      type: 'characters',
      name: 'Lorem Ipsum',
      avatar_url: 'lorem.ipsum.com',
    });

    await deleteFavoriteService.execute({
      id: favorite.id,
      user_id: user.id,
    });

    const deletedFavorite = await fakeUserFavoritesRepository.findById(
      favorite.id,
    );

    expect(deletedFavorite).toBeFalsy();
  });

  it('shoudl not be able to delete if user does not exists', async () => {
    const favorite = await fakeUserFavoritesRepository.add({
      user_id: 'random_user_id',
      favorite_id: 14785785,
      type: 'characters',
      name: 'Lorem Ipsum',
      avatar_url: 'lorem.ipsum.com',
    });

    await expect(
      deleteFavoriteService.execute({
        id: favorite.id,
        user_id: 'invalid_user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoudl not be able to delete if favorite does not exists', async () => {
    const user = await fakeUsersRepository.create({
      username: 'johndoe',
      email: 'john.doe@example.com',
      password: '123456',
    });
    await expect(
      deleteFavoriteService.execute({
        id: 'invalid_favorite_id',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoudl not be able to delete if user.id and favorite.user_id does not match', async () => {
    const user = await fakeUsersRepository.create({
      username: 'johndoe',
      email: 'john.doe@example.com',
      password: '123456',
    });

    const favorite = await fakeUserFavoritesRepository.add({
      user_id: 'random_user_id',
      favorite_id: 14785785,
      type: 'characters',
      name: 'Lorem Ipsum',
      avatar_url: 'lorem.ipsum.com',
    });

    await expect(
      deleteFavoriteService.execute({
        id: favorite.id,
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
