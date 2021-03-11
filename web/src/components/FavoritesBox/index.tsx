import React, { useState, useEffect, useCallback } from 'react';
import { FaHeart, FiHeart } from 'react-icons/all';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import {
  Container,
  FavoritesContainer,
  Favorite,
  FavIconContainer,
  Content,
} from './styles';

type IFavoriteData = {
  id: string;
  favorite_id: number;
  name: string;
  avatar_url: string;
  type: string;
};

const FavoritesBox: React.FC = () => {
  const [favoritesCharacters, setFavoritesCharacters] = useState<
    IFavoriteData[]
  >();
  const [favoritesComics, setFavoritesComics] = useState<IFavoriteData[]>();

  const history = useHistory();

  useEffect(() => {
    api
      .get('me/favorites/comics')
      .then(response => setFavoritesComics(response.data));

    api
      .get('me/favorites/characters')
      .then(response => setFavoritesCharacters(response.data));
  }, []);

  const handleComicFavorite = useCallback(
    async (comic: IFavoriteData) => {
      const isFavorite = favoritesComics?.find(
        eachFavorite => eachFavorite.favorite_id === comic.favorite_id,
      );

      if (isFavorite) {
        await api.delete(`me/favorites/${isFavorite.id}`);

        setFavoritesComics(
          favoritesComics?.filter(
            eachFavorite => eachFavorite.id !== isFavorite.id,
          ),
        );
        return;
      }

      await api.post<IFavoriteData>(`me/favorites`, {
        favorite_id: comic.id,
        name: comic.name,
        avatar_url: comic.avatar_url,
        type: 'comics',
      });

      api
        .get(`me/favorites/comics`)
        .then(response => setFavoritesComics(response.data));
    },
    [favoritesComics],
  );

  const handleCharacterFavorite = useCallback(
    async (character: IFavoriteData) => {
      const isFavorite = favoritesCharacters?.find(
        eachFavorite => eachFavorite.favorite_id === character.favorite_id,
      );

      if (isFavorite) {
        await api.delete(`me/favorites/${isFavorite.id}`);

        setFavoritesCharacters(
          favoritesCharacters?.filter(
            eachFavorite => eachFavorite.id !== isFavorite.id,
          ),
        );
        return;
      }

      await api.post<IFavoriteData>(`me/favorites`, {
        favorite_id: character.id,
        name: character.name,
        avatar_url: character.avatar_url,
        type: 'characters',
      });

      api
        .get(`me/favorites/comics`)
        .then(response => setFavoritesComics(response.data));
    },
    [favoritesCharacters],
  );

  const handleSelectedFavorite = useCallback(
    (favorite: IFavoriteData) => {
      history.push(`/dashboard/${favorite.type}/${favorite.favorite_id}`);
    },
    [history],
  );

  return (
    <Container>
      <h2>Characters</h2>
      <Content>
        <div id="content">
          <FavoritesContainer>
            {favoritesCharacters &&
              favoritesCharacters.map(character => (
                <Favorite key={character.id}>
                  <div
                    className="clickable"
                    onClick={() => handleSelectedFavorite(character)}
                  >
                    <img src={character.avatar_url} alt="comic" />

                    <p>{character.name}</p>
                  </div>

                  <FavIconContainer
                    onClick={() => handleCharacterFavorite(character)}
                  >
                    {favoritesCharacters?.find(
                      eachFavorite =>
                        eachFavorite.favorite_id === character.favorite_id,
                    ) ? (
                      <FaHeart size={24} color="e83f5b" />
                    ) : (
                      <FiHeart size={24} color="e83f5b" />
                    )}
                  </FavIconContainer>
                </Favorite>
              ))}
          </FavoritesContainer>
        </div>
      </Content>

      <h2>Comics</h2>
      <Content>
        <div id="content">
          <FavoritesContainer>
            {favoritesComics &&
              favoritesComics.map(comic => (
                <Favorite key={comic.id}>
                  <div
                    className="clickable"
                    onClick={() => handleSelectedFavorite(comic)}
                  >
                    <img src={comic.avatar_url} alt="comic" />

                    <p>{comic.name}</p>
                  </div>

                  <FavIconContainer onClick={() => handleComicFavorite(comic)}>
                    {favoritesComics?.find(
                      eachFavorite =>
                        eachFavorite.favorite_id === comic.favorite_id,
                    ) ? (
                      <FaHeart size={24} color="e83f5b" />
                    ) : (
                      <FiHeart size={24} color="e83f5b" />
                    )}
                  </FavIconContainer>
                </Favorite>
              ))}
          </FavoritesContainer>
        </div>
      </Content>
    </Container>
  );
};

export default FavoritesBox;
