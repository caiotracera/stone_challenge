import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserFavoritesRepository from '@modules/users/repositories/fakes/FakeUserFavoritesRepository';
import ListFavoritesByTypeService from '@modules/users/services/ListFavoritesByTypeService';

let fakeCacheProvider: FakeCacheProvider;
let fakeUsersRepository: FakeUsersRepository;
let fakeUserFavoritesRepository: FakeUserFavoritesRepository;
let listFavoritesByTypeService: ListFavoritesByTypeService;

describe('ListFavoritesByType', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserFavoritesRepository = new FakeUserFavoritesRepository();

    listFavoritesByTypeService = new ListFavoritesByTypeService(
      fakeUsersRepository,
      fakeUserFavoritesRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list users favorites by type', async () => {
    const user = await fakeUsersRepository.create({
      username: 'johndoe',
      email: 'john.doe@example.com',
      password: '123456',
    });

    const charOne = await fakeUserFavoritesRepository.add({
      user_id: user.id,
      type: 'characters',
      favorite_id: 1,
      name: 'Lorem Ipsum',
      avatar_url: 'lorem.ipsum.com',
    });

    const charTwo = await fakeUserFavoritesRepository.add({
      user_id: user.id,
      type: 'characters',
      favorite_id: 2,
      name: 'Lorem Ipsum',
      avatar_url: 'lorem.ipsum.com',
    });

    const charThree = await fakeUserFavoritesRepository.add({
      user_id: user.id,
      type: 'characters',
      favorite_id: 3,
      name: 'Lorem Ipsum',
      avatar_url: 'lorem.ipsum.com',
    });

    const comicOne = await fakeUserFavoritesRepository.add({
      user_id: user.id,
      type: 'comics',
      favorite_id: 1,
      name: 'Lorem Ipsum',
      avatar_url: 'lorem.ipsum.com',
    });

    const comicTwo = await fakeUserFavoritesRepository.add({
      user_id: user.id,
      type: 'comics',
      favorite_id: 2,
      name: 'Lorem Ipsum',
      avatar_url: 'lorem.ipsum.com',
    });

    const comicThree = await fakeUserFavoritesRepository.add({
      user_id: user.id,
      type: 'comics',
      favorite_id: 3,
      name: 'Lorem Ipsum',
      avatar_url: 'lorem.ipsum.com',
    });

    const charactersFavorites = await listFavoritesByTypeService.execute({
      type: 'characters',
      user_id: user.id,
    });

    const comicsFavorites = await listFavoritesByTypeService.execute({
      type: 'comics',
      user_id: user.id,
    });

    expect(charactersFavorites).toEqual([charOne, charTwo, charThree]);
    expect(comicsFavorites).toEqual([comicOne, comicTwo, comicThree]);
  });

  it('should not be able to list users favorite if user does not exists', async () => {
    await expect(
      listFavoritesByTypeService.execute({
        type: 'characters',
        user_id: 'invalid_user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
