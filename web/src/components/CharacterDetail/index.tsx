import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

import { FaHeart } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { Container, CharacterContainer, FavoriteContainer } from './styles';
import api from '../../services/api';

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

type ICharacterParam = {
  id: string;
};

type IFavoriteData = {
  id: string;
  favorite_id: number;
  name: string;
  avatar_url: string;
  type: string;
};

const CharacterDetailContainer: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<ICharacterData>();
  const [isFavorite, setIsFavorite] = useState(false);

  const params = useParams<ICharacterParam>();
  const history = useHistory();

  const handleSelectComic = useCallback(
    (uri: string) => {
      const comic_id = uri.split('/comics/')[1];
      history.push(`/dashboard/comics/${comic_id}`);
    },
    [history],
  );

  const handleIsFavorite = useCallback(async () => {
    if (selectedCharacter) {
      if (isFavorite) {
        const favorite = await api.get(
          `me/favorites/${selectedCharacter.id}/find`,
        );
        await api.delete(`me/favorites/${favorite.data.id}`);
        setIsFavorite(false);
        return;
      }

      await api.post<IFavoriteData>(`me/favorites`, {
        favorite_id: selectedCharacter.id,
        name: selectedCharacter.name,
        avatar_url: `${selectedCharacter.thumbnail.path}.${selectedCharacter.thumbnail.extension}`,
        type: 'characters',
      });
      setIsFavorite(true);
    }
  }, [isFavorite, selectedCharacter]);

  useEffect(() => {
    axios
      .get(
        `https://gateway.marvel.com:443/v1/public/characters/${params.id}?apikey=cde83a3d3993109b972960f7ba6dee7a&hash=1d08a42f328a29f054d36a1187ca314b&ts=1614357839`,
      )
      .then(response => {
        setSelectedCharacter({
          id: response.data.data.results[0].id,
          name: response.data.data.results[0].name,
          description: response.data.data.results[0].description,
          comics: response.data.data.results[0].comics.items,
          thumbnail: response.data.data.results[0].thumbnail,
        });
      });

    api.get<IFavoriteData[]>('/me/favorites/characters').then(response => {
      response.data.forEach(item => {
        if (item.favorite_id === Number(params.id)) {
          setIsFavorite(true);
        }
      });
    });
  }, [params.id]);

  return (
    <Container>
      {selectedCharacter && (
        <CharacterContainer>
          <img
            src={`${selectedCharacter.thumbnail.path}.${selectedCharacter.thumbnail.extension}`}
            alt={`${selectedCharacter.name}`}
          />
          <h1>{selectedCharacter.name}</h1>

          <FavoriteContainer>
            <button type="button" onClick={handleIsFavorite}>
              {isFavorite ? (
                <>
                  <FaHeart size={24} color="e83f5b" />
                  Remover dos favoritos
                </>
              ) : (
                <>
                  <FiHeart size={24} color="e83f5b" />
                  Adicionar aos favorites
                </>
              )}
            </button>
          </FavoriteContainer>

          <p className="description">{selectedCharacter.description}</p>

          <ul className="comics">
            <p>Comics:</p>
            {selectedCharacter.comics.length === 0 ? (
              <p>Nenhuma comic registrada</p>
            ) : (
              <>
                {selectedCharacter.comics.map(comic => (
                  <li
                    onClick={() => handleSelectComic(comic.resourceURI)}
                    key={comic.name}
                  >
                    {comic.name}
                  </li>
                ))}
              </>
            )}
          </ul>
        </CharacterContainer>
      )}
    </Container>
  );
};

export default CharacterDetailContainer;
