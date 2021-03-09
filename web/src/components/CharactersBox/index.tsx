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
  description: string;
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
  const [favorites, setFavorites] = useState<IFavoriteData[]>();
  const [pagination, setPagination] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSelectedCharacter = useCallback(async (character_id: number) => {
    const response = await axios.get(
      `https://gateway.marvel.com:443/v1/public/characters/${character_id}?apikey=cde83a3d3993109b972960f7ba6dee7a&hash=1d08a42f328a29f054d36a1187ca314b&ts=1614357839`,
    );

    // setSelectedCharacter({
    //   id: response.data.data.results[0].id,
    //   name: response.data.data.results[0].name,
    //   description: response.data.data.results[0].description,
    //   comics: response.data.data.results[0].comics.items,
    //   thumbnail: response.data.data.results[0].thumbnail,
    // });
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

  const increasePage = useCallback(() => {
    if (currentPage < pagination) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, pagination]);

  const decreasePage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  useEffect(() => {
    axios
      .get(
        'https://gateway.marvel.com:443/v1/public/characters?apikey=cde83a3d3993109b972960f7ba6dee7a&hash=1d08a42f328a29f054d36a1187ca314b&ts=1614357839',
        {
          params: {
            limit: 30,
            offset: (currentPage - 1) * 30,
          },
        },
      )
      .then(response => {
        setPagination(Math.ceil(response.data.data.total / 30));
        setCharacters(response.data.data.results);
      });

    api
      .get(`me/favorites/character`)
      .then(response => setFavorites(response.data));
  }, [currentPage]);

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
            <div onClick={decreasePage}>-</div>
            <div className="currentPage">{`Página ${currentPage} de ${pagination}`}</div>
            <div onClick={increasePage}>+</div>
          </PaginationContainer>
        </div>
      </Content>
    </Container>
  );
};

export default CharactersBox;
