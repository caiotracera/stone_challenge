import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserFavoritesRepository from '@modules/users/repositories/fakes/FakeUserFavoritesRepository';
import FindFavoriteByFavoriteIdService from '@modules/users/services/FindFavoriteByFavoriteIdService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserFavoritesRepository: FakeUserFavoritesRepository;
let findFavoriteByFavoriteId: FindFavoriteByFavoriteIdService;

describe('FindFavoriteByFavoriteId', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserFavoritesRepository = new FakeUserFavoritesRepository();

    findFavoriteByFavoriteId = new FindFavoriteByFavoriteIdService(
      fakeUsersRepository,
      fakeUserFavoritesRepository,
    );
  });

  it('should be able to find a favorite', async () => {
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

    const searchedFavorite = await findFavoriteByFavoriteId.execute({
      favorite_id: 14785785,
      user_id: user.id,
    });

    expect(searchedFavorite?.favorite_id).toBe(favorite.favorite_id);
  });

  it('should return undefined if favorite does not exists', async () => {
    const user = await fakeUsersRepository.create({
      username: 'johndoe',
      email: 'john.doe@example.com',
      password: '123456',
    });

    const searchedFavorite = await findFavoriteByFavoriteId.execute({
      favorite_id: 14785785,
      user_id: user.id,
    });

    expect(searchedFavorite).toBeUndefined();
  });

  it('should not be able to find favorite if user does not exists', async () => {
    const favorite = await fakeUserFavoritesRepository.add({
      user_id: 'random_user_id',
      favorite_id: 14785785,
      type: 'characters',
      name: 'Lorem Ipsum',
      avatar_url: 'lorem.ipsum.com',
    });

    await expect(
      findFavoriteByFavoriteId.execute({
        favorite_id: favorite.favorite_id,
        user_id: 'invalid_user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
