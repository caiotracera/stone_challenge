import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import { FaHeart, FiHeart } from 'react-icons/all';
import {
  Container,
  CharactersContainer,
  Character,
  FavContainer,
  Content,
  SelectedCharacterContainer,
  PaginationContainer,
} from './styles';
import api from '../../services/api';

type IRequestData = {
  id: number;
  name: string;
  isFav: boolean;
  thumbnail: {
    path: string;
    extension: string;
  };
};

type IComicData = {
  resourceURI: string;
  name: string;
};

type ICharacterData = {
  id: number;
  name: string;
  comics: IComicData[];
  thumbnail: {
    path: string;
    extension: string;
  };
};

type IFavoriteData = {
  id: string;
  favorite_id: number;
};

const CharactersBox: React.FC = () => {
  const [characters, setCharacters] = useState<IRequestData[]>();
  const [selectedCharacter, setSelectedCharacter] = useState<ICharacterData>();
  const [favorites, setFavorites] = useState<IFavoriteData[]>();

  const handleSelectedCharacter = useCallback(async (character_id: number) => {
    const response = await axios.get(
      `https://gateway.marvel.com:443/v1/public/characters/${character_id}?apikey=cde83a3d3993109b972960f7ba6dee7a&hash=1d08a42f328a29f054d36a1187ca314b&ts=1614357839`,
    );

    setSelectedCharacter({
      id: response.data.data.results[0].id,
      name: response.data.data.results[0].name,
      comics: response.data.data.results[0].comics.items,
      thumbnail: response.data.data.results[0].thumbnail,
    });
  }, []);

  const handleFavorite = useCallback(
    async (character_id: number) => {
      const isFavorite = favorites?.find(
        eachFavorite => eachFavorite.favorite_id === character_id,
      );

      if (isFavorite) {
        await api.delete(`me/favorites/${isFavorite.id}`);
        const filteredFavorites = favorites?.filter(
          eachFavorite => eachFavorite.id !== isFavorite.id,
        );

        setFavorites(filteredFavorites);
        return;
      }

      await api.post<IFavoriteData>(`me/favorites`, {
        favorite_id: character_id,
        type: 'character',
      });

      api
        .get(`me/favorites/character`)
        .then(response => setFavorites(response.data));
    },
    [favorites],
  );

  useEffect(() => {
    axios
      .get(
        'https://gateway.marvel.com:443/v1/public/characters?apikey=cde83a3d3993109b972960f7ba6dee7a&hash=1d08a42f328a29f054d36a1187ca314b&ts=1614357839',
        {
          params: {
            limit: 21,
            offset: 1380,
          },
        },
      )
      .then(response => {
        setCharacters(response.data.data.results);
      });

    api
      .get(`me/favorites/character`)
      .then(response => setFavorites(response.data));
  }, []);

  return (
    <Container>
      <h2>Characters</h2>
      <Content>
        <div id="content">
          <CharactersContainer>
            {characters &&
              characters.map(character => (
                <Character
                  key={character.id}
                  onClick={() => {
                    handleSelectedCharacter(character.id);
                  }}
                >
                  <img
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt="char"
                  />

                  <p>{character.name}</p>

                  <FavContainer onClick={() => handleFavorite(character.id)}>
                    {favorites?.find(
                      eachFavorite => eachFavorite.favorite_id === character.id,
                    ) ? (
                      <FaHeart size={24} color="e83f5b" />
                    ) : (
                      <FiHeart size={24} color="e83f5b" />
                    )}
                  </FavContainer>
                </Character>
              ))}
          </CharactersContainer>
          <PaginationContainer>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>...</div>
            <div>999</div>
          </PaginationContainer>
        </div>
        <SelectedCharacterContainer>
          {selectedCharacter ? (
            <>
              <img
                src={`${selectedCharacter.thumbnail.path}.${selectedCharacter.thumbnail.extension}`}
                alt="char"
              />
              <p className="title">{selectedCharacter.name}</p>
              {selectedCharacter.comics.length === 0 ? (
                <b>Nenhuma comics associada a esse personagem</b>
              ) : (
                <>
                  Comics:
                  <ul>
                    {selectedCharacter.comics.map(comic => (
                      <li key={comic.name}>{comic.name}</li>
                    ))}
                  </ul>
                </>
              )}
            </>
          ) : (
            <h2>Selecione um personagem</h2>
          )}
        </SelectedCharacterContainer>
      </Content>
    </Container>
  );
};

export default CharactersBox;
