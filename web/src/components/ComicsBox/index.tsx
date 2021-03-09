import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaHeart, FiHeart } from 'react-icons/all';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import {
  Container,
  ComicsContainer,
  Comic,
  FavContainer,
  Content,
  PaginationContainer,
} from './styles';

type IRequestData = {
  id: number;
  title: string;
  isFav: boolean;
  thumbnail: {
    path: string;
    extension: string;
  };
};

type IFavoriteData = {
  id: string;
  favorite_id: number;
};

const ComicsBox: React.FC = () => {
  const [comics, setComics] = useState<IRequestData[]>();
  const [favorites, setFavorites] = useState<IFavoriteData[]>();
  const [pagination, setPagination] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const history = useHistory();

  const handleSelectedComic = useCallback(
    async (comic_id: number) => {
      history.push(`/dashboard/comics/${comic_id}`);
    },
    [history],
  );

  const handleFavorite = useCallback(
    async (comic_id: number) => {
      const isFavorite = favorites?.find(
        eachFavorite => eachFavorite.favorite_id === comic_id,
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
        favorite_id: comic_id,
        type: 'comics',
      });

      api
        .get(`me/favorites/comics`)
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
        'https://gateway.marvel.com:443/v1/public/comics?apikey=cde83a3d3993109b972960f7ba6dee7a&hash=1d08a42f328a29f054d36a1187ca314b&ts=1614357839',
        {
          params: {
            limit: 27,
            offset: (currentPage - 1) * 27,
          },
        },
      )
      .then(response => {
        setPagination(Math.ceil(response.data.data.total / 27));
        setComics(response.data.data.results);
      });

    api
      .get(`me/favorites/comics`)
      .then(response => setFavorites(response.data));
  }, [currentPage]);

  return (
    <Container>
      <h2>Comics</h2>
      <Content>
        <div id="content">
          <ComicsContainer>
            {comics &&
              comics.map(comic => (
                <Comic key={comic.id}>
                  <div
                    className="clickable"
                    onClick={() => {
                      handleSelectedComic(comic.id);
                    }}
                  >
                    <img
                      src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                      alt="comic"
                    />

                    <p>{comic.title}</p>
                  </div>

                  <FavContainer onClick={() => handleFavorite(comic.id)}>
                    {favorites?.find(
                      eachFavorite => eachFavorite.favorite_id === comic.id,
                    ) ? (
                      <FaHeart size={24} color="e83f5b" />
                    ) : (
                      <FiHeart size={24} color="e83f5b" />
                    )}
                  </FavContainer>
                </Comic>
              ))}
          </ComicsContainer>
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

export default ComicsBox;
